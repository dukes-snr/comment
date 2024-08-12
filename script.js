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
            commentElement.querySelector('.sub-comments').appendChild(newReply);
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

document.getElementById('image-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const imagePopup = document.querySelector('.image-popup');
        imagePopup.style.display = 'block';
        document.querySelector('.image-preview-thumbnail').src = e.target.result;
        document.querySelector('.image-name').textContent = file.name;
    };
    reader.readAsDataURL(file);
});

document.querySelector('.send-btn').addEventListener('click', function() {
    const commentText = document.querySelector('.add-comment input[type="text"]').value;
    const commentList = document.querySelector('.modal-body');
    const newComment = document.createElement('div');
    newComment.classList.add('comment');

    let imageContent = '';
    const imagePopup = document.querySelector('.image-popup');
    if (imagePopup.style.display === 'block') {
        imageContent = `<img src="${document.querySelector('.image-preview-thumbnail').src}" alt="Selected Image">`;
        imagePopup.style.display = 'none'; // Hide the popup after sending the comment
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

    // Re-attach the like button functionality for the new comment
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

document.querySelectorAll('.like-btn').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.toggle('liked');
        let likeCount = parseInt(this.querySelector('.like-count').textContent);
        if (this.classList.contains('liked')) {
            this.querySelector('.like-count').textContent = likeCount + 1;
            this.querySelector('i').style.color = 'red';
        } else {
            this.querySelector('.like-count').textContent = likeCount - 1;
            this.querySelector('i').style.color = '';
        }
    });
});

