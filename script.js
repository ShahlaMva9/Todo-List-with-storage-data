const input = document.querySelector("#newtask input");
const btn = document.querySelector("#newtask button");
const tasks = document.querySelector("#tasks");
const storeData = [];
const isCom = ["Completed", "Not Complete"];
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
        console.log(currentList);
        let findList;
        storeData.forEach((i) => {
          if (i.value[0] == currentList.innerText) {
            findList = i;
          }
        });
        console.log(findList);
        const a = localStorage.getItem(findList.key);

        console.log(a);
        localStorage.setItem(
          findList.key,
          JSON.stringify([findList.value, "Compeleted"])
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
  console.log(span[0].parentElement);
  for (let i = 0; i < span.length; i++) {
    if (span[i].parentElement.classList.contains("greenBackgorund")) {
      storeData[i] = {
        key: `list${i}`,
        value: [span[i].innerText, `Compeleted`],
      };
    } else {
      storeData[i] = {
        key: `list${i}`,
        value: [span[i].innerText],
      };
    }

    localStorage.setItem(storeData[i].key, JSON.stringify(storeData[i].value));
  }
}

btn.addEventListener("click", createList);
