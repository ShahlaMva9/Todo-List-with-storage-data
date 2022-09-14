const input = document.querySelector("#newtask input");
const btn = document.querySelector("#newtask button");
const tasks = document.querySelector("#tasks");
const storeData = [];

input.addEventListener("input", (e) => {
  const { value } = e.target;
  if (!value.trim().length) {
    btn.disabled = true;
  } else {
    btn.disabled = false;
  }
});

input.addEventListener("keyup", function (e) {
  if (e.keyCode == 13) {
    createList();
  }
});

function createList(e) {
  if (input.value.trim() == "") {
    return null;
  }
  const listContent = `
  <div class="task">
            <span id="taskname">
                ${input.value}
            </span>
            <div class="actions">
                <button class="complete">
                    <i class="fa-solid fa-check"></i>
                </button>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        </div>
  `;
  tasks.innerHTML += listContent;

  storageData();
  input.value = "";
}

function completeList() {
  const comBtb = document.querySelectorAll("#tasks .task .complete");

  comBtb.forEach((i) => {
    i.addEventListener("click", function (e) {
      const answer = confirm("do you want complete this tasks");

      if (answer) {
        i.parentElement.parentElement.classList.add("greenBackgorund");
        const currentList = i.parentElement.parentElement.firstElementChild;
        const findList = storeData.find(
          (i) => i.value == currentList.innerText
        );
        localStorage.setItem(
          findList.key,
          JSON.stringify([findList.value, "Completed"])
        );
      }
    });
  });
}

function deleteList(e) {
  const delBtn = document.querySelectorAll("#tasks .task .delete");

  delBtn.forEach((i) => {
    i.addEventListener("click", function (e) {
      const answer = confirm("do you want delete this tasks");
      if (answer) {
        const parentElem = i.parentElement.parentElement;
        const currentList = parentElem.firstElementChild;
        const findList = storeData.find(
          (i) => i.value == currentList.innerText
        );
        localStorage.removeItem(findList.key);
        tasks.removeChild(parentElem);
      }
    });
  });
}

function storageData(e) {
  completeList();
  deleteList();

  const span = document.querySelectorAll("#tasks #taskname ");

  for (let i = 0; i < span.length; i++) {
    storeData[i] = {
      key: `list${i}`,
      value: span[i].innerText,
    };

    localStorage.setItem(`list${i}`, JSON.stringify([span[i].innerText]));
  }
}

btn.addEventListener("click", createList);
