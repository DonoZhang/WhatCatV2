$(document).ready(function(){
		$(":button").css("box-shadow",'3px 3px 30px 5px black').css("background-color", 'rgba(255,255,255,0.9)');
		$(":text").css("box-shadow",'3px 3px 30px 5px black');
	});
	
/*......................global variables declaration(or initialization)......................*/
	//an array of integers from 0 to 29; to store indexes in ascending order 
	const original = (function(length){
		var arr = [];
		for(let i = 0; i<length; i++){
			arr.push(i);
		}
		return arr;
	})(30); 
	//a copy of "original", will be shuffled, to store indexes in random order
	var indexes = [...original];
	var count; //the number of questions answered, range from 0 to 29; 
	var score; //the number of questions answered correctly in a round
	var timerCount; //timer
	var myVar;//to clear setTimeOut
	
/*..............................random question order..............................*/

	//in this program, there are 5 random questions in each round, and questions within each round should not appear again in other rounds until all questions have been traversed. To realize:
		//Firstly, shuffle the index array to get a random array
		//Then, use five indexes from this array every round, until all 30 have been used
		//Once all 30 have been used, restart from the first step 
	
	//1. shuffle
	
	//this function runs when click "Start Game" on start page
	function startPage(){
		
		//reset global variables and shuffle the index array
		score = 0;
		count = 0;
		shuffle(indexes);
		//display a new question
		let index = indexes[count];
		displayQuestion(index);
		displayAnswers(index);
		
		//animation
		$("#flipcard").css('box-shadow', '15px 15px 30px 5px  black').css('top','0.3em');
		window.location.href = "#page2";
		$("#flipcard").hide();
		var clear = setTimeout(function(){
			cardDrop(600);
			clearTimeout(clear);
		},300);
	}
	
	//2. 5 questions each turn
	
	//this function runs when click "Next" button on game page
	function nextPage(){
		count++;
		//hide the button first
		//$("#nextBtn").hide();
			
		//check whether a group of 5 questions have been answered
		switch(count){
			//every 5 questions, goes to the end page
			case 5:
			case 10:
			case 15:
			case 20:
			case 25:
			case 30:{
				
				//prepare display
				$("#scoreResult").html("Your Score: " + score);
				//store score of this round
				checkStore();
				//window slide
				$("#page3").css('width', '0');
				//animation
				$("#floatingWindow").animate({left: '-10em'},function(){
					window.location.href = "#page3";
					$("#page3").animate({width: '100%'}, 1000);
					toggler = false;
					$("#collapseBtn").html("COLLAPSE");
					collapseAndShow();
					//refresh page
					$("input[type=radio]").prop('checked', false).prop('disabled',false).checkboxradio('refresh');
					$("#ansImg").hide();
					$("#ansResult").hide();
					$("#numQuest").hide();
					$("#rightAns").hide();
				});
				//3. if the last question, shuffle "indexes", restart count
				if(count == 30){
					shuffle(indexes);
					count = 0;
				}
				break;
			}
			//if still within five questions, refresh page and display the next question
			default:{
				//animation
				$("#floatingWindow").animate({left: '-10em'},function(){
					nextCard();
					$("#flipcard").css('box-shadow', '15px 15px 30px 5px  black').css('top','0.3em');
					cardDrop(300);
					$("#ansImg").hide();
					$("#ansResult").hide();
					$("#numQuest").hide();
					$("#rightAns").hide();
				});
			}
		}
	}
	
	//this function runs when click "Start Game" on end page
	function startAgain(){
		//reset score
		score = 0;
		//animation
		$("#flipcard").css('box-shadow', '15px 15px 30px 5px  black').css('top','0em');
		window.location.href = "#page2";
		$("#flipcard").hide();
		var clear = setTimeout(function(){
			cardDrop(600);
			clearTimeout(clear);
		},300);
	}

/*..............................store questions and answers..............................*/	
	//in this array, each item is a question object with three properties:
		//questionImg: the url of the question's image
		//rightAns: the right answer of this question
		//fourAns: a function which returns an array of four answers, one of which is the right answer, the other three are random unique wrong answers; the positions of the right and wrong answers are random
	var questions = [
		{questionImg: "Images/Himalayan Cat.jpg", rightAns: "Himalayan Cat", fourAns: getFourAns},
		{questionImg: "Images/Japanese Bobtail.jpg", rightAns: "Japanese Bobtail", fourAns: getFourAns},
		{questionImg: "Images/Munchkin Cat.jpg", rightAns: "Munchkin Cat", fourAns: getFourAns},
		{questionImg: "Images/Napoleon Cat.jpg", rightAns: "Napoleon Cat", fourAns: getFourAns},
		{questionImg: "Images/Norwegian Forest.jpg", rightAns: "Norwegian Forest", fourAns: getFourAns},
		{questionImg: "Images/Persian cat.jpg", rightAns: "Persian cat", fourAns: getFourAns},
		{questionImg: "Images/Ragamuffin Cat.jpg", rightAns: "Ragamuffin Cat", fourAns: getFourAns},
		{questionImg: "Images/Ragdoll.jpg", rightAns: "Ragdoll", fourAns: getFourAns},
		{questionImg: "Images/Russian Blue.jpg", rightAns: "Russian Blue", fourAns: getFourAns},
		{questionImg: "Images/Scottish Fold.jpg", rightAns: "Scottish Fold", fourAns: getFourAns},
		{questionImg: "Images/Selkirk Rex.jpg", rightAns: "Selkirk Rex", fourAns: getFourAns},
		{questionImg: "Images/Siamese Cat.jpg", rightAns: "Siamese Cat", fourAns: getFourAns},
		{questionImg: "Images/Siberian Cat.jpg", rightAns: "Siberian Cat", fourAns: getFourAns},
		{questionImg: "Images/Singapura Cat.jpeg", rightAns: "Singapura Cat", fourAns: getFourAns},
		{questionImg: "Images/Snowshoe Cat.jpg", rightAns: "Snowshoe Cat", fourAns: getFourAns},
		{questionImg: "Images/Sphynx Cat.jpg", rightAns: "Sphynx Cat", fourAns: getFourAns},
		{questionImg: "Images/Turkish Angora.jpg", rightAns: "Turkish Angora", fourAns: getFourAns},
		{questionImg: "Images/Turkish Van.jpeg", rightAns: "Turkish Van", fourAns: getFourAns},
		{questionImg: "Images/Abyssinian Cat.jpg", rightAns: "Abyssinian Cat", fourAns: getFourAns},
		{questionImg: "Images/American Bobtail.jpg", rightAns: "American Bobtail", fourAns: getFourAns},
		{questionImg: "Images/American Shorthair.jpg", rightAns: "American Shorthair", fourAns: getFourAns},
		{questionImg: "Images/American Wirehair.jpg", rightAns: "American Wirehair", fourAns: getFourAns},
		{questionImg: "Images/Balinese Cat.jpg", rightAns: "Balinese Cat", fourAns: getFourAns},
		{questionImg: "Images/Birman Cat.jpg", rightAns: "Birman Cat", fourAns: getFourAns},
		{questionImg: "Images/Bombay Cat.jpg", rightAns: "Bombay Cat", fourAns: getFourAns},
		{questionImg: "Images/British Shorthair.jpg", rightAns: "British Shorthair", fourAns: getFourAns},
		{questionImg: "Images/Cornish Rex.jpg", rightAns: "Cornish Rex", fourAns: getFourAns},
		{questionImg: "Images/Dragon Li.jpeg", rightAns: "Dragon Li", fourAns: getFourAns},
		{questionImg: "Images/Egyptian Mau.jpg", rightAns: "Egyptian Mau", fourAns: getFourAns},
		{questionImg: "Images/Exotic Shorthair.jpg", rightAns: "Exotic Shorthair", fourAns: getFourAns}];
	//realization of getFourAns function:
	function getFourAns(){
		var rightIndex = questions.indexOf(this);//the index of the right answer
		var indexesCopy = [...original];//avoid affecting the original array
		indexesCopy.splice(rightIndex,1);//delete that right index, then all of the rest numbers are indexes of wrong answers
		
		//get indexes of three random wrong answers
		shuffle(indexesCopy);
		var index1, index2, index3;
		[index1, index2, index3] = indexesCopy; //now index1, index2, and index3 are indexes of three random wrong answers
		
		//get responsive answers
		var fourAnswers = [questions[index1].rightAns, questions[index2].rightAns, questions[index3].rightAns, questions[rightIndex].rightAns];
		
		//random order
		shuffle(fourAnswers);
		console.log(rightIndex, index1, index2, index3, indexesCopy);
		return fourAnswers;
	}

/*..............................display questions and answers..............................*/
	function displayQuestion(index){
		$("#questionImg").attr("src", questions[index].questionImg);
	}
	function displayAnswers(index){
		var answers = questions[index].fourAns();
		$("#rad0").html(answers[0]);
		$("#radAnswers_0").val(answers[0]);
		$("#rad1").html(answers[1]);
		$("#radAnswers_1").val(answers[1]);
		$("#rad2").html(answers[2]);
		$("#radAnswers_2").val(answers[2]);
		$("#rad3").html(answers[3]);
		$("#radAnswers_3").val(answers[3]);
	}
	
	
/*..............................tools..............................*/
	
	//shuffler
	function shuffle(a) {
    	for (let i = a.length - 1; i > 0; i--) {
			//generate a random integer j between o and i (included)
        	const j = Math.floor(Math.random() * (i + 1));
			//swap
        	[a[i], a[j]] = [a[j], a[i]];
		}
	}

	//timer
	//when pass in reset = true, reset the timer
	function startTimer(reset){
		if(reset){//if reset
			clearTimeout(myVar);
			timerCount = 30;
			$("#ansTimer").html(timerCount);
			myVar = setTimeout(startTimer, 1000, false );
		}
		else{
			//if not reset
			if(timerCount > 0){
				timerCount --;
				$("#ansTimer").html(timerCount);
				myVar = setTimeout(startTimer, 1000, false);
			}
			else{
				nextPage();
			}
		}
	}
	
	//answer checker
	//runs when select a radio button
	function checkAns(){
		var num = count % 5 + 1;
		$("#numQuest").html(num + "/5");
		var radioValue = $("input[name='radAnswers']:checked").val();
		var rightAns = questions[indexes[count]].rightAns;
		$("#rightAns").html(rightAns);
		if(radioValue == rightAns){
			$("#ansResult").html("Correct!");
			$("#ansImg").attr("src", 'Images/Correct.png');
			score++;
		}
		else{
			$("#ansResult").html("Wrong!");
			$("#ansImg").attr("src", 'Images/Wrong.png');
		}
		//disable radio button
		$("input[type=radio]").attr("disabled", true);
	}
	
	//comparer for score sorter
	function compare(obj1, obj2){
       return obj2.aScore - obj1.aScore; //descending order
    }
	
	/*..............................store and display top scores..............................*/
	
	var marker;//tell do store how to store the new record
	
	//store into local function the highest five scores
	//check whether to ask user to save score 
	function checkStore(){
		var storage;
		//nothing in storage, directly store the new record
		if(!(JSON.parse(localStorage.getItem("Top 5 Scores")) instanceof Array)){
			$("#messageAns").html("Congratulations! <br>New top-5!");
			$("#textContainer").show();
			$("#confirmBtn").show();
			marker = 0; 
		}
		//if already some scores
		else {
			storage = JSON.parse(localStorage.getItem("Top 5 Scores"));
			//if already 5 scores in local storage, compare the new score with the lowest (scores[0]), keep the larger; then sort the array and store (override the old one)
			if(storage.length==5){ 
				if(score>storage[4].aScore){
					$("#messageAns").html("Congratulations! <br>New top-5!");
					$("#textContainer").show();
					$("#confirmBtn").show();
					marker = 1;// already 5 records, but this record new top 5, replace the smallest one with this one, sort and store
				}
				else{
					marker = 3; //not top 5, don't show name input box
					$("#messageAns").html("&nbsp");
				}
			}
			else{ //less than 5 records in storage, add, sort and store
				$("#messageAns").html("Congratulations! <br>New top-5!");
				$("#textContainer").show();
				$("#confirmBtn").show();
				marker = 2;
			}
		}
	}
	
	function doStore(){
		var storage;
		var name;
		var newRecord;
		switch(marker){
				case 0:{//nothing in storage, directly store the new record
					name = $("#nameInput").val();
					newRecord = {aName: name, aScore: score};
					storage = JSON.stringify([newRecord]);
					try{
						localStorage.setItem("Top 5 Scores", storage);
					}
					catch(e){
						alert("Exceeded Storage Quota!");
					}
					break;
				}
				case 2:{//less than 5 records in storage, add, sort and store
					name = $("#nameInput").val();
					newRecord = {aName: name, aScore: score};
					storage = JSON.parse(localStorage.getItem("Top 5 Scores"));
					storage.push(newRecord);
					storage.sort(compare);
					storage = JSON.stringify(storage);
					try{
						localStorage.setItem("Top 5 Scores", storage);
					}
					catch(e){
						alert("Exceeded Storage Quota!");
					}
					break;
				}
				case 1:{// already 5 records, but this record new top 5, replace the smallest one with this one, sort and store
					name = $("#nameInput").val();
					newRecord = {aName: name, aScore: score};
					storage = JSON.parse(localStorage.getItem("Top 5 Scores"));
					storage[4] = newRecord;
					storage.sort(compare);
					storage = JSON.stringify(storage);
					try{
						localStorage.setItem("Top 5 Scores", storage);
					}
					catch(e){
						alert("Exceeded Storage Quota!");
					}
					break;
				}
			}
	}
	
	//display top five scores in descending order
	function doDisplay(){
		var str = "";
		if(JSON.parse(localStorage.getItem("Top 5 Scores")) instanceof Array){
			var storage = JSON.parse(localStorage.getItem("Top 5 Scores"));
			console.log(storage);
			for(let i = 0; i < storage.length; i++){
				str += "<li>" + storage[i].aName + "&nbsp&nbsp&nbsp&nbsp" + storage[i].aScore + "</li>";
			}
		}
		$("#scoreAns").html(str);
	}
	
/*..............................Animation..............................*/	
	//flip animation
	function nextCard(){
		$("input[type=radio]").prop('checked', false).prop('disabled',false).checkboxradio('refresh');
		var clear2 = setTimeout(function(){
			//start timer
			startTimer(true);
			clearTimeout(clear2);
		}, 500);

		//display a new question
		let index = indexes[count];
		displayQuestion(index);
		displayAnswers(index);
	}
	
	
	
	//stretch
	function cardDrop(speed){
		$("#flipcard").show();
		$("#flipcard").animate({
			top: '0.5em',
			boxShadowX: '3px',
    		boxShadowY:'3px',
    		boxShadowBlur: '20px'
		}, speed);
		startTimer(true);
		//refresh page
		$("#ansResult").html("");
		$("#numQuest").html("");
		$("#rightAns").html("");
		$("input[type=radio]").prop('checked', false).prop('disabled',false).checkboxradio('refresh');
	}
	
	//floatwindow
	var toggler;
	function collapseAndShow(){
		if(toggler){
			$("#enterName").animate({left:'-4.5em'}, function(){
				$("#messageAns").hide();
				$("#collapseBtn").html("SHOW");
				toggler = false;
			});
		}
		else{
			$("#enterName").animate({left:'0'},function(){
				$("#collapseBtn").html("COLLAPSE");
				toggler = true;
			});
			$("#messageAns").show();
		}
	}
/*..............................function bindings..............................*/	

	//hide Next button
	$(document).ready(function hideNext(){
		//$("#nextBtn").hide();
		$("#textContainer").hide();
	});
	//"Start Game" button on the start page
	$("#startBtn").on("click", startPage);
	//radiobutton
	$("input[type=radio]").on("click", function clickAns(){
		clearTimeout(myVar);
		checkAns();
		//$("#nextBtn").show();
		$("#ansImg").show();
		$("#ansResult").show();
		$("#numQuest").show();
		$("#rightAns").show();
		$("#floatingWindow").animate({left: '0'});
	});
	
	$("#flipcard").mousedown(function(){
		$(this).animate({
			top: '0.6em',
			boxShadowX: '0px',
    		boxShadowY:'0px',
    		boxShadowBlur: '10px'},200);
		});
	$("#flipcard").mouseup(function(){
		$(this).animate({
			top: '0.5em',
			boxShadowX: '3px',
    		boxShadowY:'3px',
    		boxShadowBlur: '20px'},200);
		});
	$("#floatingWindow").mousedown(function(){
		$(this).animate({
			boxShadowX: '0px',
    		boxShadowY:'0px',
    		boxShadowBlur: '10px'
		},200);
	});
	$("#floatingWindow").mouseup(function(){
		$(this).animate({
			boxShadowX: '3px',
    		boxShadowY:'3px',
    		boxShadowBlur: '20px'
		},200);
	});
	$("#enterName").mousedown(function(){
		$(this).animate({
			boxShadowX: '0px',
    		boxShadowY:'0px',
    		boxShadowBlur: '10px'
		},200);
	});
	$("#enterName").mouseup(function(){
		$(this).animate({
			boxShadowX: '3px',
    		boxShadowY:'3px',
    		boxShadowBlur: '20px'
		},200);
	});
	
	$(":button").mousedown(function(){
		$(this).animate({
			boxShadowX: '0px',
    		boxShadowY:'0px',
    		boxShadowBlur: '10px'
		},200);
	});
	$(":button").mouseup(function(){
		$(this).animate({
			boxShadowX: '3px',
    		boxShadowY:'3px',
    		boxShadowBlur: '30px'
		},200);
	});
	
	//"Next" on game page
	$("#nextBtn").mouseup(function(){
		nextPage();
	});
	//"Start" on end page
	$("#startAgainBtn").on("click",function(){
		if(toggler){
			$("#enterName").animate({left:'-4.5em'},function(){
				$("#collapseBtn").html("SHOW");
				$("#messageAns").hide();
				$("#textContainer").hide();
				$("#nameInput").css("opacity", '1').css("background-color", 'white').removeAttr("disabled").val("Unnamed");
				startAgain();
			});
			toggler = false;
		}
		else{
			$("#textContainer").hide();
			$("#nameInput").css("opacity", '1').css("background-color", 'white').removeAttr("disabled").val("Unnamed");
			startAgain();
		}
	});
	//"Top score" on end page
	$("#topBtn").bind("click", function toScoresPage(){
		if(toggler){
			$("#enterName").animate({left:'-4.5em'},function(){
				$("#collapseBtn").html("SHOW");
				$("#messageAns").hide();
				doDisplay();
				$("#page4").css('left', '-100vw');
				window.location.href = "#page4";
				$("#page4").animate({'left': '0'},500);
			});
			toggler = false;
		}
		else{
			doDisplay();
			$("#page4").css('left', '-100vw');
			window.location.href = "#page4";
			$("#page4").animate({'left': '0'},500);
			
		}
	});
	//"Back" on top score page
	$("#backBtn").bind("click", function goBack(){
		$("#page4").animate({left: '100vw'}, 500, function(){
			history.back();
		});
	});
	$("#clearBtn").bind("click", function doClear(){
		localStorage.clear();
		doDisplay();
		$("#messageAns").html("&nbsp");
	});
	$("#collapseBtn").mouseup(function(){
		collapseAndShow();
	});
	
	$("#confirmBtn").bind("click",function(){
		doStore();
		$("#nameInput").attr("disabled", "disabled");
		$("#confirmBtn").hide();
		$("#nameInput").css("opacity", '0.5').css("background-color", 'darkgrey');
		collapseAndShow();
	});
	