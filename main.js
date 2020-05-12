const $properNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,""];
let $numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,""]
let $startNumbers = [];
let $allButtons = Array.from(document.querySelectorAll('.btn'));
let nullBtn ;
let $countView = document.querySelector('.count-view');
let $result = 0;
let $gameOver = document.querySelector('.game-over');




const setNull = () => {
    $nullBtn = document.querySelector('.null');
    $nullBtn.textContent = "";
}

// --- przypisanie numerów 

const fillBoard = () => {
    randomNumbers();   
    $allButtons.forEach((item, number) => {
        item.textContent = $startNumbers[number];
    })    
}

const randomNumbers = () => {
    let $temporaryNumbers = $properNumbers;  
    let $lopCount = $temporaryNumbers.length - 1;
       
    while($lopCount > 0) {
        let $temporaryNumber = Math.floor(Math.random() * ($lopCount -1 )); 
        let $number = $temporaryNumbers.splice($temporaryNumber, 1); 
        $startNumbers.push($number);           
        $lopCount --;
    }       
}

// -------  określenie które są dostępne do przesunięcia

const setEnabled = () => {
    let $null = document.querySelector('.null');
    let $nullIndex = $allButtons.indexOf($null);
    let $enabledIndexes = [$nullIndex -1, $nullIndex +1, $nullIndex -4 , $nullIndex +4];    
    for(let i = 0; i < $allButtons.length; i++) {
        if($enabledIndexes.includes(i)) {           
            $allButtons[i].classList.add('enabled');
            $allButtons[i].style.cursor = "pointer";
        }else {
            $allButtons[i].classList.remove('enabled');
            $allButtons[i].style.cursor = "not-allowed";
        }
    }    
}

// sprawdzenie czy zadanie rozwiązane

const isOk = () => {
    let bolsik = 1;
    for(let i = 0; i < $properNumbers.length; i++){
        if($properNumbers[i] != $numbers[i]){
            bolsik = 0;
            return bolsik;            
        }
        console.log(i);
    }
    return bolsik;
}

/*
const setBoardReady = () => {
    $result += 1;
    $allButtons.filter(btn => btn.classList.contains('enabled')).map(btn => {
        btn.addEventListener('click', function(e) {
            let $temp;
            $temp = e.target.textContent;
            $nullBtn.textContent = $temp;
            $nullBtn.classList.remove('null');
            e.target.textContent = "";
            e.target.classList.add('null');            
            $countView.textContent = $result;          
            setNull();  
            setEnabled();  
            if(!isOk()){ 
            setBoardReady();           
            } else {
                $gameOver.classList.remove('hidden');
            }
        })  
            
    });    
}
*/

const setListener = () => {
    $allButtons.filter(btn => btn.classList.contains('enabled')).map(btn => {
        btn.addEventListener('click', handleClick)
    });
}

const handleClick = (e) => {
    console.log(e.target.textContent);
        $result += 1;
        $countView.textContent = $result;
        let $temp;
            $temp = e.target.textContent;
            $nullBtn.textContent = $temp;
            $nullBtn.classList.remove('null');
            e.target.textContent = "";
            e.target.classList.add('null'); 
            setNull();  
            setEnabled();
            if(!isOk){
            setListener();
            } else {
                $gameOver.classList.remove('hidden');
            }
}







//-------------------------executing ------------------------------------------------ 
setNull();
fillBoard();
setEnabled();
setListener();



//setBoardReady();



















