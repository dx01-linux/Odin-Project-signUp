const APP = {
    setListeners : function(){
        let form = document.querySelector('form');
        form.noValidate = true;

        let fName = document.querySelector('#f-name');
        let lName = document.querySelector('#l-name');
        let email = document.querySelector('#email');
        let phone = document.querySelector('#phone');
        let password = document.querySelector('#password');
        let cPass = document.querySelector('#cPassword');

        //onBlur validate data inputed by user in input elem
        [fName , lName , email , phone].forEach(inp =>{
            inp.addEventListener('blur' , e=>{
                this.testingInput(inp);
            });
        });
        
        //onBlur validate data inputed by user in input[pass] elem & confirm if it match confirmPassowrd
        password.addEventListener('blur' , e=>{
            this.testingInput(password);
            this.confirmPass(password , cPass);
        });
        //onBlur validate data inputed by user in input[pass] elem & confirm if it match confirmPassowrd
        cPass.addEventListener('blur' , e=>{
            this.confirmPass(password , cPass);
        });
   
        form.addEventListener('submit' , eve =>{
            eve.preventDefault(); //stop submition
            //valid
            if(form.checkValidity()){
                //check if password and cPassword match
                if(this.confirmPass(password , cPass)){
                    form.submit();
                }
            }
            //invalid 
            else {
                //check if all of them contain valid data
                [fName , lName , email , phone , password].forEach(inp => {
                    this.testingInput(inp);
                });
            }
        });
    } ,

    testingInput : function(input){
        //valid input value
        if(input.checkValidity() == true){
            //style input
           this.switchValidityStyle(input , "valid"); 
           //style error msg input
           let errorMsg = input.parentElement.lastElementChild;
           this.switchValErrorMSg(errorMsg , "error-msg-hide" , "error-msg-show" , 'valid');
           //style label
           let label = input.parentElement.firstElementChild;
           this.switchValLabel(label , 'val-label' , 'inval-label' , 'valid');
           
        } 
        //invalid input's value 
        else {
            //style input
            this.switchValidityStyle(input , "invalid");
            //style error msg field
            let errorMsg = input.parentElement.lastElementChild;
            this.switchValErrorMSg(errorMsg , 'error-msg-hide' , "error-msg-show" , 'invalid');
            //style label
            let label = input.parentElement.firstElementChild;
            this.switchValLabel(label , 'val-label' , 'inval-label' , 'invalid')
    
        }
    },
    confirmPass : function(pass , cPass){
        if(cPass.value != '' || pass.value != ""){
            if(pass.value == cPass.value){
                //same
                this.switchValidityStyle(cPass , 'valid');
                let errorMsg = cPass.parentElement.lastElementChild;
                this.switchValErrorMSg(errorMsg , 'error-msg-hide' , "error-msg-show" , 'valid');
                let label = cPass.parentElement.firstElementChild;
                this.switchValLabel(label , 'val-label' , 'inval-label' , 'valid');
                return true ;
        
                
            } else {
                // different
                this.switchValidityStyle(cPass , 'invalid')
                let errorMsg = cPass.parentElement.lastElementChild;
                this.switchValErrorMSg(errorMsg , 'error-msg-hide' , "error-msg-show" , 'invalid');
                let label = cPass.parentElement.firstElementChild;
                this.switchValLabel(label , 'val-label' , 'inval-label' , 'invalid')
                return false ;
            }
        }
    },
    switchValidityStyle : function(input , status = 'valid' ){
            //was selected before 
        if(input.classList.contains("invalid") || input.classList.contains('valid')){
            if(status == 'valid'){
                //switch to valid if it was invalid
                if(input.classList.contains('invalid')){
                    input.classList.remove('invalid');
                    input.classList.add('valid');
                }
            } else if (status == 'invalid'){
                //switch to invalid if it was valid
                if(input.classList.contains('valid')){
                    input.classList.remove('valid');
                    input.classList.add('invalid'); 
                }
            }
        } 
        //no select before
        else {
            input.classList.add(status);
        }
    },
    switchValErrorMSg : function(tag , hideClassName , showClassName , validity){
        if(validity == 'valid'){
            //valid
                if(tag.classList.contains(hideClassName) || tag.classList.contains(showClassName)){
                    if(tag.classList.contains(showClassName)){
                        tag.classList.remove(showClassName);
                        tag.classList.add(hideClassName)
                    }
                } else {
                    tag.classList.add(hideClassName);
                }
        
        }else if (validity == 'invalid') {
            //invalid
            if(tag.classList.contains(hideClassName) || tag.classList.contains(showClassName)){
                if(tag.classList.contains(hideClassName)){
                    tag.classList.remove(hideClassName);
                    tag.classList.add(showClassName)
                }
            } else {
                tag.classList.add(showClassName);
            }
        }
    },
    switchValLabel : function(tag , validClass , invalidClass , validity){
        //validated before 
        if(tag.classList.contains(validClass) || tag.classList.contains(invalidClass)){
             //valid
            if(validity == 'valid'){
                //contain invalid
                if(tag.classList.contains(invalidClass)){
                    tag.classList.remove(invalidClass);
                    tag.classList.add(validClass);
                }    
            }
            //invalid
            else if (validity == 'invalid') {
                //contain valid
                if(tag.classList.contains(validClass)){
                    tag.classList.remove(validClass);
                    tag.classList.add(invalidClass);
                } 
            }
        } 
        //frist time validating 
        else {
            if(validity == 'valid'){
                tag.classList.add(validClass);
            } else if (validity =='invalid'){
                tag.classList.add(invalidClass);
            }
        }
    }

};


window.addEventListener('load' , APP.setListeners());