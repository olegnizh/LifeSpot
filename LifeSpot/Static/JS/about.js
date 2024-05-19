function askForReview() {
    this.userName = prompt("Как вас зовут ?")
    if (this.userName == null) {
        this.empty = true;
        return;
    }

    this.comment = prompt("Напишите свой отзыв")
    if (this.comment == null) {
        this.empty = true;
        return;
    }

    this.date = new Date().toLocaleString();
}

function addComment() {
    let comment = new askForReview();
    if (comment.empty) {
        return;
    }

    if (confirm("Желаете дать другим посетителям возможность оценивать ваш комментарий?")) {
        let ratedComment = Object.create(comment);
        ratedComment.rate = 0;
        postReview(ratedComment);
    }
    else {
        postReview(comment);
    }
}

const postReview = review => {
    let rating = '';
    
    if (review.hasOwnProperty('rate')) {
        rating += `           <b style="color: chocolate">Рейтинг: <button id =“${review.userName + review.date}” onclick = "addLike(this.id)">❤️ ${review.rate}</button> </b>   `;
    }
    document.getElementsByClassName('reviews')[0].innerHTML += '<div class="review-text">\n' +
        `<p> <i> <b>${review['userName']}</b>  ${review['date']}${rating}</i></p>` +
        `<p>${review['comment']}</p>` +
        '</div>';
}

function addLike(id) {
    let like = document.getElementById(id)
    let array = like.innerText.split(' ')
    let resultNum = parseInt(array[array.length - 1], 10);
    resultNum += 1
    array[array.length - 1] = `${resultNum}`
    like.innerText = array.join(' ')
}