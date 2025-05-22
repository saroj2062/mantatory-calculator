// functional buttom
const calculationBtm = document.getElementById("calculation");
const clear = document.getElementById("btm-clear");
// data retreving variable
const amount = document.getElementById("amount");
const term = document.getElementById("term");
const rate = document.getElementById("rate");
let type ="";

const checkBox =document.querySelectorAll("input[type='checkbox']");
const inputs = document.querySelectorAll("input[type='text']");
// const form = document.getElementById("myForm");
// state changable variable value
const error = document.querySelectorAll(".error");
const repayment = document.getElementById("repayments-value");
const total =document.getElementById("total-value");
let state = false;

// checking input is number or not if it is any other character then displa
// y error 

const checkingInput = (input ,i)=>{

    const value  = input.target.value;

    const raw =removingComma(value);

    if(!/^\d*$/.test(raw))
    {
        error[i].innerText="invalid input";
        error[i].style.display="block";
        input.target.disabled=true;

        setTimeout(()=>{
            input.target.disabled=false;
            input.target.focus();
            input.target.value="";
            error[i].style.display="none";

        },1000)
        
    }

    else{
        error[1].style.display="none";
        input.target.value=formatingInput(raw);
        
    }

}
const removingComma = (value)=>{
    return value.replace(/,/g,'');
}
//formating input into a english formate 
const formatingInput = (value)=>{

   
    let str = value.toString();


    let result="",count=0;

    for(let i = str.length -1 ; i >=0 ; i-- )
    {
        result = str[i] +result;
        count++;

        if(count % 3 === 0 && i !== 0)
        {
            result =','+result;

        }

    }
    return result;

}

//updataing type value from interest to repayment
const paymentType = (e)=>{
   
    checkBox.forEach((inp)=>{
        inp.checked = false; 
    })
 if(e.target.value == "rep")
 {
    e.target.checked = true;
    type= "repayment";
   
     
 }
 else{
    e.target.checked = true;
    type = "interest";
    
 }

}
// checking form input data valid or invalid 
const checkingValidation = (e)=>{
 
  e.preventDefault();

   
if( checking())
{ 
    resultDisplayer();
}

}
const checking = ()=>{
    let allInputField = true;
    inputs.forEach((inp,i)=>{
    
    const value = inp.value;
    
    if(value.trim() === "")
    {
        error[i].innerText = "The input field is empty";
        error[i].style.display = "block";
        allInputField = false;
        // document.body.classList.add("error");
    }
   
    setTimeout(()=>{
        error[i].style.display = "none"; 
        //   document.body.classList.remove("error");
    },1000)

   })
  
        return allInputField;
    
   
}
// clearing function

const clearForm = ()=>{
    inputs.forEach((e)=>{
        e.value = "";
    })
    checkBox.forEach((inp)=>{
        inp.checked=false;
    })
     total.innerHTML="£"+ "000";
    repayment.innerHTML="£"+"000";
}
const callingFormatingInput = (value)=>{
     let parts = value.split(".");
    let decimal = parts[1];
    let integer= parts[0];

    return formatingInput(integer)+"."+decimal;
}
//Result display section
const resultDisplayer = ()=>{
   

        const empty = document.getElementById("empty");
        empty.style.display = "none";
        const result = document.querySelector(".result-design");
        result.style.display = "flex";
        total.innerHTML="£"+ "000";
        repayment.innerHTML="£"+"000";
       
        calculation();
       }



const calculation = (trm,amt,r,mthRepy,totRepay,mthInt,totInt)=>{

    if(type =="") return 0;

 
       trm = parseInt(removingComma(term.value)) ;
       amt = parseInt(removingComma(amount.value)) ;
       r = parseInt(rate.value)
    
       if (isNaN(trm) || isNaN(amt) || isNaN(r)) {
       
        return 0;
    }
    const totalPayment = trm * 12 ; 
    const monthlyRate = r / 100 / 12;
    
    

    if(type == 'repayment')
    {
      
     const hMthyRepy = (amt * monthlyRate * Math.pow(1 + monthlyRate ,totalPayment) / 
                        (Math.pow(1 + monthlyRate,totalPayment) - 1));
         mthRepy = callingFormatingInput(hMthyRepy.toFixed(3));
        repayment.innerHTML="£" + mthRepy;


         totRepay = hMthyRepy * totalPayment;
         const totalYearlyPayment = callingFormatingInput(totRepay.toFixed(3));
         total.innerHTML="£" + totalYearlyPayment;
   }
   else if ( type == "interest")
   {
    const monthlyInterest = Math.round(amt * monthlyRate);
    mthInt = callingFormatingInput(monthlyInterest.toFixed(3));
    repayment.innerHTML = "£"+mthInt;

      const totalInterest = Math.round(monthlyInterest * totalPayment);
    totInt = callingFormatingInput(totalInterest.toFixed(3));
    total.innerHTML = "£"+ totInt;

   }
}
//  calling part 
clear.addEventListener("click",clearForm);

calculationBtm.addEventListener("click", checkingValidation);

inputs.forEach((inp, i) => {
    inp.addEventListener("input", (e) => checkingInput(e, i));
});

checkBox.forEach((inp)=>{
    inp.addEventListener('change',(e)=>{
        paymentType(e);
    })
})