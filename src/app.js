import { http } from './http';
import{ ui } from './UI';
// Get posts on DOM load
document.addEventListener('DOMContentLoaded',getPosts);
// add posts
document.querySelector('.post-submit').addEventListener('click',submitPost);
// delete posts
document.querySelector('#posts').addEventListener('click',deletePost);
// edit post
document.querySelector('#posts').addEventListener('click',enableEdit);
// listen for cancel
document.querySelector('.card-form').addEventListener('click',cancelEdit);


// get post

function getPosts(){
    http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}
// submit post
function submitPost(){
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;

    const data = {
        title,
        body
    }

    if(title === '' || body === '')
    {
        ui.showAlert('Please fill in all fields','alert alert-danger');
    }
    else
    {
        // if no id means create post state
        if(id === '')
        {
                // create post
            http.post('http://localhost:3000/posts',data)
            .then(data => {
                ui.showAlert('Post Added Successfully','alert alert-success');
                ui.clearFields();
                getPosts();
            })
            .catch(err => console.log(err));
        }
        else
        {
            // means update post id is in hiddden part therfore edit state
                   // create post
            http.put(`http://localhost:3000/posts/${id}`,data)
            .then(data => {
                ui.showAlert('Post Updated','alert alert-success');
                ui.changeFormState('add');
                getPosts();
            })
            .catch(err => console.log(err));

        }
       
      
    }

   

}

// delete post
function deletePost(e){
    e.preventDefault();
    if(e.target.parentElement.classList.contains('delete')){
        const id = e.target.parentElement.dataset.id;
        if(confirm('Are You Sure.?')){
            http.delete(`http://localhost:3000/posts/${id}`)
            .then(data => {
                ui.showAlert('Post Removed','alert alert-success');
                getPosts();
            })
            .catch(err => console.log(err));
        }
    }
}

// edit post

function enableEdit(e){
    if(e.target.parentElement.classList.contains('edit'))
    {
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;
        const data ={
            id,
            title,
            body
        }

        // fill form with current post
        ui.fillForm(data);
    }
    e.preventDefault();
}

// cancel edit
function cancelEdit(e){
    if(e.target.classList.contains('post-cancel')){
        ui.changeFormState('add');
    }
    e.preventDefault();
}