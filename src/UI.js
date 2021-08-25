class UI {
    constructor(){
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = 'add';
    }
    showPosts(posts) {
        let output='';
        
        posts.forEach((post) =>{
            output+=`
            <div class="card mb-3">
            <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}"><i class="fa fa-pencil"></i></a>
            <a href="#" class="delete card-link" data-id="${post.id}"><i class="fa fa-remove"></i></a>
            </div>
            </div>
            `;
        });

        this.post.innerHTML=output;
    }

    showAlert(message,className){
        const div = document.createElement('div');
        div.className=className;
        div.appendChild(document.createTextNode(message));
        // get parent
        const container=document.querySelector('.postsContainer');
        // get posts
        const posts = document.querySelector('#posts');
        // insert alert  div
        container.insertBefore(div,posts);

        // set time out
        setTimeout(() => {
            this.clearAlert();
        },2000);
    }

    clearAlert(){
        const currentAlert= document.querySelector('.alert');

        if(currentAlert)
        {
            currentAlert.remove();
        }
    }

    clearFields(){
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }
    // fill form to edit 
    fillForm(data){
        this.idInput.value = data.id;
        this.titleInput.value=data.title;
        this.bodyInput.value=data.body;

        this.changeFormState('edit');
    }

    // clear id input
    clearIdInput () {
        this.idInput.value='';
    }

    //change form state
    changeFormState(type){
        if(type === 'edit'){
            this.postSubmit.textContent = 'Update Post';
            this.postSubmit.className = 'post-submit btn btn-warning btn-block';
            // create cancel button

            const button = document.createElement('button');
            button.className= 'post-cancel btn btn-light btn-block';
            button.appendChild(document.createTextNode('Cancel Edit'));

            // get parent
            const cardForm = document.querySelector('.card-form');
            // get element to insert before
            const formEnd = document.querySelector('.form-end');
            // insert cancel button
            cardForm.insertBefore(button,formEnd);
        }
        else
        {
            this.postSubmit.textContent = 'Post It';
            this.postSubmit.className = 'post-submit btn btn-primary btn-block';
            // remove cancel button
            if(document.querySelector('.post-cancel')){
                document.querySelector('.post-cancel').remove();
            }

            // clear ID from hidden field
            this.clearIdInput();
            // clear text feilds
             this.clearFields();
        }
    }

}

export const ui = new UI();