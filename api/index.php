<?php
	function getRequiredField($field){
		if(isset($_GET[$field])) {
			return $_GET[$field];
		}else{
			echo "invalid " . $field;
			die();
		}
		return;
	}
	
	$action = getRequiredField("action");
	
	require_once("config.php");

	switch ($action) {
		case "login":
			$id = getRequiredField("id");
			$name = getRequiredField("name");
			
			$user = ORM::for_table('users')->where('id', $id)->find_one();
			if($user){
				echo '{"status":1,"new":0,"image":"' . $user->image . '"}';
				die();
			}else{
				//save image
				$image = "img$id.jpg";
				$url = "https://graph.facebook.com/$id/picture?width=250&height=250";
				$data = file_get_contents($url);
				$fp = fopen("../images/$image","wb");
				if (!$fp) exit;
				fwrite($fp, $data);
				fclose($fp);
				
				//save in the database
				$user = ORM::for_table('users')->create();
				$user->id = $id;
				$user->name = $name;
				$user->image = $image;
				$user->save();
				echo '{"status":1,"new":1,"image":"$image"}';
				die();
			}
			break;
		
		case "start":
			$user = getRequiredField("user");
			$expireDate = new DateTime();
			$tosub = new DateInterval('PT1M');
			$expireDate->sub($tosub);
			//find a created match
			$match = ORM::for_table('match')->where(array('user1' => $user, 'user2' => "0"))->where_gt('date', $expireDate->format('c'))->find_one();
			if($match){
				//already has a match created
				echo '{"status":1,"wait":1,"match":"' . $match->id . '"}';
				die();
			}else{
				//find empty match
				$match = ORM::for_table('match')->where(array('user2' => "0"))->where_gt('date', $expireDate->format('c'))->find_one();
				if($match){
					//found a waiting match
					$match->user2 = $user;
					$match->save();
					
					$opponentId = $match->user1;
					$opponent = ORM::for_table('users')->where('id', $opponentId)->find_one();
					
					echo '{"status":1,"wait":0,"match":"' . $match->id . '", "opponentId":"' . $opponent->id . '", "opponentName":"' . $opponent->name . '", "opponentImage":"' . $opponent->image . '"}';
					die();
				}else{
					//no match available
					//create one
					$match = ORM::for_table('match')->create();
					$match->user1 = $user;
					$match->date = date('c');
					$match->save();
					echo '{"status":1,"wait":1,"match":"' . $match->id . '"}';
					die();
				}
			}
			break;
		
		case "find":
			$user = getRequiredField("user");
			$matchId = getRequiredField("match");
			$expireDate = new DateTime();
			$tosub = new DateInterval('PT1M');
			$expireDate->sub($tosub);
			$match = ORM::for_table('match')->where('id', $matchId)->where_gt('date', $expireDate->format('c'))->find_one();
			if($match){
				if($match->user2=="0") {
					echo '{"status":1,"wait":1,"match":"' . $match->id . '"}';
					die();
				}else{
					$opponentId	= $match->user2;
					$opponent = ORM::for_table('users')->where('id', $opponentId)->find_one();
					echo '{"status":1,"wait":0,"match":"' . $match->id . '", "opponentId":"' . $opponentId . '", "opponentName":"' . $opponent->name . '", "opponentImage":"' . $opponent->image . '"}';
					die();
				}
			}else{
				echo '{"status":0,"message":"match not found or expired"}';
				die();
			}
			break;
			
		case "level":
			$levelId = getRequiredField("level");
			$match = getRequiredField("match");
			$level = ORM::for_table('games')->where('level', $levelId)->find_many();
			if($level){
				$randomIndex =  intval($match) % count($level);
				echo '{"status":1,"exists":"1","id":"' . $level[$randomIndex]->id . '","title":"' . $level[$randomIndex]->title . '","description":"' . $level[$randomIndex]->description . '","parameters":"' . $level[$randomIndex]->parameters . '","parametersTest":' . $level[$randomIndex]->parametersTest . '}';
				die();
			}else{
				echo '{"status":0,"message":"level not found"}';
				die();
			}
			break;
			
		case "answer":
			$game = getRequiredField("game");
			$match = getRequiredField("match");
			$user = getRequiredField("user");
			$code = getRequiredField("code");
			
			//save in the database
			$answers = ORM::for_table('answers')->create();
			$answers->game = $game;
			$answers->match = $match;
			$answers->user = $user;
			$answers->code = $code;
			$answers->save();
			
			echo '{"status":1}';
			die();
			break;
			
		case "opponentAnswer":
			$opponentId = getRequiredField("opponentId");
			$match = getRequiredField("match");
			$game = getRequiredField("game");
			
			$opponentAnswer = ORM::for_table('answers')->where(array('user' => $opponentId, 'match' => $match, 'game' => $game))->find_one();
			
			if($opponentAnswer){
				echo '{"status":1, "code":' . json_encode($opponentAnswer->code) . '}';
				die();
			}else{
				echo '{"status":0}';
				die();
			}
			break;
	}
	
	function saveImage($url, $savePath) 
	{

		$ch = curl_init($url);
		$fp = fopen($savePath, 'wb');

		curl_setopt($ch, CURLOPT_TIMEOUT, 20);
		curl_setopt($ch, CURLOPT_FAILONERROR, true);
		curl_setopt($ch, CURLOPT_FILE, $fp);
		curl_setopt($ch, CURLOPT_HEADER, 0);

		$result = curl_exec($ch);

		fclose($fp);
		curl_close($ch);

		return $result;
	}
	
	die();
?>