//改變顏色DOM
const colorBox = document.querySelector(".colorBox");
const body = document.querySelector("body");

//改變背景色監聽
colorBox.addEventListener("click", function (e) {
  if (e.target.value === "WHITE") {
    body.setAttribute("style", "background:white;");
  } else if (e.target.value === "BLUE") {
    body.setAttribute("style", "background:#90f1ef;");
  } else if (e.target.value === "PINK") {
    body.setAttribute("style", "background:#f7d5df;");
  } else if (e.target.value === "YELLOW") {
    body.setAttribute("style", "background:#ffef9f;");
  } else if (e.target.value === "LIME") {
    body.setAttribute("style", "background:#c0f7a4;");
  } else if (e.target.value === "GREEN") {
    body.setAttribute("style", "background:#7bf1a8;");
  }
})
//本地端伺服器
const _url = "http://localhost:3000/todos/";

// 新增事項DOM
const todoInput = document.querySelector(".todoInput");
const addBtn = document.querySelector(".addBtn");

//列表DOM
const todoList = document.querySelector(".todoList");

//渲染函式
function render() {
  axios.get(_url)
    .then(function (response) {
      let data = response.data;
      let str = "";
      data.forEach(function (item) {
        str += `<li class="mb-3">
            <p class="fs-4">${item.content}</p>
            <div class="text-end">
              <button class="border border-light border-3  rounded-2 px-3 " type="button"  data-fNum="${item.id}">finish</button>
              <button class="border border-light border-3  rounded-2 px-3 " type="button" data-dNum="${item.id}">delete</button>
            </div>
          </li>`;
      })
      todoList.innerHTML = str;
    })
}
// render();

// 新增監聽
addBtn.addEventListener("click", function (e) {
  if (todoInput.value == "") {
    alert("請輸入內容");
    return;
  }

  let obj = {};
  obj["content"] = todoInput.value;
  axios.post(_url, obj)
    .then(function (response) {
      render();
    })

})

//列表監聽
todoList.addEventListener("click",function(e){
   if(e.target.textContent==="delete"){
     let num = e.target.getAttribute("data-dNum");
     axios.delete(_url+num).then(function(response){
      render();
     })
   }else if(e.target.textContent==="finish"){
     let p = e.target.parentNode.previousElementSibling;
     p.classList.add("text-decoration-line-through");
   }
})

// todo 以下目前測試無效，可能需要其他進階技巧
//全部事項按鈕DOM
// const editAll = document.querySelector(".editAll")

//全部事項監聽
// editAll.addEventListener("click", function (e) {
//   if (e.target.textContent === "delete all") {
//     axios.delete(`${_url}`)
//     .then(function(response){
//       render();
//     })
//   }
// });