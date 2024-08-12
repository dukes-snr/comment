document.querySelectorAll('.reply-btn').forEach(button => {
    button.addEventListener('click', function() {
        const commentElement = this.closest('.comment');
        const username = commentElement.querySelector('.comment-header strong').textContent;
        const snippet = commentElement.querySelector('p').textContent;
        
        document.querySelector('.reply-popup').style.display = 'block';
        document.querySelector('.reply-username').textContent = username;
        document.querySelector('.reply-snippet').textContent = snippet;

        document.querySelector('.send-btn').addEventListener('click', function() {
            const replyText = document.querySelector('.add-comment input[type="text"]').value;
            const newReply = document.createElement('div');
            newReply.classList.add('sub-comment');
            newReply.innerHTML = `
                <div class="comment-header">
                    <strong>Your Username</strong> &bull; Just now
                </div>
                <p>${replyText}</p>
                <div class="comment-actions">
                    <button class="reply-btn">Reply</button>
                    <button class="like-btn"><i class="fas fa-heart"></i> <span class="like-count">0</span></button>
                </div>
            `;
            commentElement.appendChild(newReply);
            document.querySelector('.reply-popup').style.display = 'none';
            document.querySelector('.add-comment input[type="text"]').value = '';
        });
    });
});

document.querySelector('.cancel-reply-btn').addEventListener('click', function() {
    document.querySelector('.reply-popup').style.display = 'none';
});

document.getElementById('image-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const imagePreview = document.createElement('img');
        imagePreview.src = e.target.result;
        imagePreview.classList.add('image-preview');
        document.querySelector('.modal-footer').insertBefore(imagePreview, document.querySelector('.media-options'));
    };
    reader.readAsDataURL(file);
});

document.querySelector('.send-btn').addEventListener('click', function() {
    const commentText = document.querySelector('.add-comment input[type="text"]').value;
    const commentList = document.querySelector('.modal-body');
    const newComment = document.createElement('div');
    newComment.classList.add('comment');
    
    let imageContent = '';
    const imagePreview = document.querySelector('.image-preview');
    if (imagePreview) {
        imageContent = `<img src="${imagePreview.src}" alt="Selected Image">`;
        imagePreview.remove(); // Remove the preview after adding the comment
    }
    
    newComment.innerHTML = `
        
        <div class="comment-content">
            <img src="default-profile.jpg" alt="User Profile" class="profile-pic">
            <div>
                <div class="comment-header">
                <strong>Username</strong> &bull; Just now
                </div>
                <p>${commentText}</p>
                ${imageContent}
                <div class="comment-actions">
                    <button class="reply-btn">Reply</button>
                    <button class="like-btn"><i class="fas fa-heart"></i> <span class="like-count">0</span></button>
                </div>
            </div>
        </div>`;
    commentList.appendChild(newComment);
    document.querySelector('.add-comment input[type="text"]').value = '';
    
    // Adding like functionality to new comment
    newComment.querySelector('.like-btn').addEventListener('click', function() {
        this.classList.toggle('liked');
        let likeCount = parseInt(this.querySelector('.like-count').textContent);
        if (this.classList.contains('liked')) {
            this.querySelector('.like-count').textContent = likeCount + 1;
        } else {
            this.querySelector('.like-count').textContent = likeCount - 1;
        }
    });
});
