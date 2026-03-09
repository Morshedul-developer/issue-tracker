let currentStatus = "all";
const issueContainer = document.getElementById("issue-container");
const tabsContainer = document.getElementById("tabs-container");
const btnAll = document.getElementById("btn-all");
const btnOpen = document.getElementById("btn-open");
const btnClosed = document.getElementById("btn-closed");
const totalIssues = document.getElementById("total");
const spinner = document.getElementById("spinner");
const modal = document.getElementById("issue-details-modal");
const modalContainer = document.getElementById("modal-container");
const searchInput = document.getElementById("search-input");
const main = document.querySelector("main");

const showLabels = (arr) => {
  const newElements = arr.map(
    (
      item,
    ) => `<div class="badge gap-1 px-1.5 badge-soft ${item == "bug" ? "badge-error" : item == "enhancement" ? "badge-info" : item == "good first issue" ? "badge-success" : item == "documentation" ? "badge-primary" : "badge-warning"} border ${item == "bug" ? "border-error" : item == "enhancement" ? "border-info" : item == "good first issue" ? "border-success" : item == "documentation" ? "border-primary" :"border-warning"} rounded-2xl text-[9.5px]">${item == "bug" ? '<i class="fa-solid fa-bug text-[10px]"></i>' : item == "enhancement" ? '<i class="fa-solid fa-wand-magic-sparkles"></i>' : item == "good first issue" ? '<i class="fa-solid fa-clipboard-check"></i>' : item == "documentation" ? '<i class="fa-brands fa-readme"></i>' : '<i class="fa-regular fa-life-ring text-[10px]"></i>'}${item.toUpperCase()}
                  </div>`,
  );
  return newElements.join(" ");
};

const removeActiveStatus = () => {
  const allButtons = document.querySelectorAll(".btn-tab");
  allButtons.forEach((btn) => {
    btn.classList.remove(
      "bg-gradient-to-r",
      "from-purple-600",
      "to-indigo-500",
      "text-white",
      "hover:from-purple-700",
      "hover:to-indigo-600",
      "shadow-md",
      "hover:shadow-lg",
      "transition-all",
      "duration-200",
    );
    btn.classList.add("btn-outline", "hover:bg-neutral", "hover:text-white");
  });
};

const totalCounts = () => {
  totalIssues.innerText = issueContainer.children.length;
  if (issueContainer.children.length === 0) {
    main.classList.add("h-screen");
  } else {
    main.classList.remove("h-screen");
  }
};

const showSpinner = () => {
  spinner.classList.remove("hidden");
  spinner.classList.add("flex");
};
const hideSpinner = () => {
  spinner.classList.add("hidden");
  spinner.classList.remove("flex");
};

const openModal = async (id) => {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const data = await res.json();
  displayModal(data.data);
  modal.showModal();
};

// load issues
const loadAllIssues = async () => {
  showSpinner();
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const issues = await res.json();
  displayIssues(issues.data);
};
const loadOpenIssues = async () => {
  showSpinner();
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const issues = await res.json();
  const allData = issues.data;
  const openIssues = allData.filter((issue) => issue.status === "open");
  displayIssues(openIssues);
};
const loadClosedIssues = async () => {
  showSpinner();
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const issues = await res.json();
  const allData = issues.data;
  const closedIssues = allData.filter((issue) => issue.status !== "open");
  displayIssues(closedIssues);
};
const loadSearchIssues = async (searchText) => {
  showSpinner();
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`,
  );
  const data = await res.json();
  displayIssues(data.data);
};

// display issues
const displayIssues = (issues) => {
  issueContainer.innerHTML = "";
  issues.forEach((issue) => {
    const div = document.createElement("div");
    div.onclick = () => openModal(issue.id);
    div.className = `space-y-3 p-3 rounded-lg shadow-md border-t-3 border-[${issue.status == "open" ? "#00A96E" : "#A855F7"}]`;
    div.innerHTML = `
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <img src="./assets/${issue.status == "open" ? "Open-Status.png" : "Closed- Status .png"}" alt="" />
                  <div class="badge badge-soft ${issue.priority == "high" ? "badge-error" : issue.priority == "medium" ? "badge-warning" : "badge-soft text-gray-500"} rounded-2xl">
                    ${issue.priority.toUpperCase()}
                  </div>
                </div>
                <h4 class="text-[14px] font-semibold truncate">
                  ${issue.title}
                </h4>
                <p class="text-[12px] text-gray-500 line-clamp-2">
                  ${issue.description}
                </p>
                <div class="flex gap-1">
                ${showLabels(issue.labels)}
                </div>
              </div>
              <hr class="-mx-3 border-gray-200" />
              <div>
                <div class="flex justify-between">
                <p class="text-[12px] text-gray-500">#${issue.id} by ${issue.author}</p>
                <span class="text-[12px] text-gray-500">${new Date(issue.createdAt).toLocaleDateString()}</span>
                </div>
                <div class="flex justify-between">
                <p class="text-[12px] text-gray-500">Assignee: ${issue.assignee ? issue.assignee : "N/A"}</p>
                <span class="text-[12px] text-gray-500">Updated: ${new Date(issue.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
        `;
    issueContainer.append(div);
  });
  totalCounts();
  hideSpinner();
};

const displayModal = (issue) => {
  modalContainer.innerHTML = "";
  modalContainer.innerHTML = `
    <div class="space-y-2">
              <h3 class="text-2xl font-bold">${issue.title}</h3>
              <div class="flex gap-8">
                <div
                  class="badge ${issue.status == "open" ? "badge-success" : "badge-error"} font-medium rounded-2xl text-white"
                >
                  ${issue.status == "open" ? "Opened" : "Closed"}
                </div>
                <ul class="flex gap-8 text-gray-500 list-disc">
                  <li>Opened by ${issue.author}</li>
                  <li>${new Date(issue.createdAt).toLocaleDateString()}</li>
                </ul>
              </div>
            </div>
            <div>
              <div class="flex gap-1">${showLabels(issue.labels)}</div>
            </div>
            <div>
              <p class="text-gray-500">
                ${issue.description}
              </p>
            </div>
            <div class="flex bg-[#F8FAFC] p-4 rounded-lg">
              <div class="flex-1 space-y-1">
                <p class="text-gray-500">Assignee:</p>
                <h6 class="font-semibold">${issue.assignee ? issue.assignee : "N/A"}</h6>
              </div>
              <div class="flex-1 space-y-1">
                <p class="text-gray-500">Priority:</p>
                <div class="badge ${issue.priority == "high" ? "badge-error text-white" : issue.priority == "medium" ? "badge-warning" : "badge-soft text-gray-500"} rounded-2xl font-medium">
                  ${issue.priority.toUpperCase()}
                </div>
              </div>
            </div>
    `;
};

const showCategory = (status) => {
  if (status == "all") {
    removeActiveStatus();
    btnAll.classList.add(
      "bg-gradient-to-r",
      "from-purple-600",
      "to-indigo-500",
      "text-white",
      "hover:from-purple-700",
      "hover:to-indigo-600",
      "shadow-md",
      "hover:shadow-lg",
      "transition-all",
      "duration-200",
    );
    btnAll.classList.remove(
      "btn-outline",
      "hover:bg-neutral",
      "hover:text-white",
    );
    loadAllIssues();
  } else if (status == "open") {
    removeActiveStatus();
    btnOpen.classList.add(
      "bg-gradient-to-r",
      "from-purple-600",
      "to-indigo-500",
      "text-white",
      "hover:from-purple-700",
      "hover:to-indigo-600",
      "shadow-md",
      "hover:shadow-lg",
      "transition-all",
      "duration-200",
    );
    btnOpen.classList.remove(
      "btn-outline",
      "hover:bg-neutral",
      "hover:text-white",
    );
    loadOpenIssues();
  } else if (status == "closed") {
    removeActiveStatus();
    btnClosed.classList.add(
      "bg-gradient-to-r",
      "from-purple-600",
      "to-indigo-500",
      "text-white",
      "hover:from-purple-700",
      "hover:to-indigo-600",
      "shadow-md",
      "hover:shadow-lg",
      "transition-all",
      "duration-200",
    );
    btnClosed.classList.remove(
      "btn-outline",
      "hover:bg-neutral",
      "hover:text-white",
    );
    loadClosedIssues();
  }
  totalCounts();
};

document.getElementById("search-btn").addEventListener("click", () => {
  const searchValue = searchInput.value;
  removeActiveStatus();
  loadSearchIssues(searchValue);
});

showCategory(currentStatus);
