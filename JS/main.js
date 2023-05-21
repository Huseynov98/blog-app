const NUMBER_OF_CHARACTERS_IN_TEXT = 'Количество символов в посте больше 200';
const NUMBER_OF_CHARACTERS_IN_TITLE = 'Количество символов в заголовоке больше 100';
const CHAR_LIMIT_IN_TITLE = 50;
const CHAR_LIMIT_IN_TEXT = 200;
const  STATUS_OUT_OF_LIMIT_CLASSNAME = 'status__red';

const posts = [];

const postTitleInputNode  =  document.getElementById('postTitleInput');
const postTextInputNode  =  document.getElementById('postTextInput');
const publicationBtnNode = document.getElementById('publicationBtn');
const feedList = document.getElementById('feedList');
const postsNode = document.getElementById('posts');


let titleCharCount = document.getElementById('titleCharCount');
let textCharCount = document.getElementById('textCharCount');
let titleCharCountWrapper = document.getElementById('titleCharCountWrapper');
let textCharCountWrapper = document.getElementById('textCharCountWrapper');


function initApp () {
    titleCharCount.textContent = CHAR_LIMIT_IN_TITLE;
    textCharCount.textContent = CHAR_LIMIT_IN_TEXT;
};

initApp();

publicationBtnNode.addEventListener('click', function() {
    const postFromUser =  getPostFromUser();
    
    addPost(postFromUser);

    renderPosts();
});

function getPostFromUser () {
    const title = postTitleInputNode.value;
    const text = postTextInputNode.value;

    return {
        title: title,
        text: text
    };
}

function addPost ({title,text}) {
    const currentDate = new Date();

    const createdDate = currentDate
    .toLocaleDateString('ru-RU',{
        day: 'numeric',
        month: 'long',
        year:'numeric',
    })

    .replace(/ г\.$/, "");
    const createdTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
    const createdDateTime = `${createdDate} ${createdTime}`;


    posts.push({
        title,
        text,
        created:createdDateTime,
    });
};

function getPosts () {
    return posts;
}

function renderPosts () {
    const posts = getPosts();

    let postsHTML ='';

posts.forEach(post => {
    postsHTML +=  `
    <div class='post'>
        <p class='post__created'>${post.created}</p>
        <p class='post__title'>${post.title}</p>
        <p class='post__text'>${post.text}</p>
    </div>
`;
});
    postsNode.innerHTML = postsHTML; 
}

function clearInputs () {
    postTitleInputNode.value = '';
    postTextInputNode.value = '';
    titleCharCount.textContent = CHAR_LIMIT_IN_TITLE;
    textCharCount.textContent = CHAR_LIMIT_IN_TEXT;
};

postTitleInputNode.addEventListener('input', () => {
    const count = CHAR_LIMIT_IN_TITLE - postTitleInputNode.value.length;
    titleCharCount.textContent = count;

    if (count < 0) {
        postTitleInputNode.value = postTitleInputNode.value.substring(
            0,
            CHAR_LIMIT_IN_TITLE
        );
        titleCharCountWrapper.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    } else {
        titleCharCountWrapper.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
    }
});

postTextInputNode.addEventListener ('input',() => {
    const count = CHAR_LIMIT_IN_TEXT - postTextInputNode.value.length;
    textCharCount.textContent = count;

    if (count < 0) {
        postTextInputNode.value = postTextInputNode.value.substring(
            0,
            CHAR_LIMIT_IN_TEXT
        );
        textCharCountWrapper.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    } else {
        textCharCountWrapper.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
    }
})