const currentStatus = "all";
const issueContainer = document.getElementById("issue-container");
const tabsContainer = document.getElementById("tabs-container");
const btnAll = document.getElementById("btn-all");
const btnOpen = document.getElementById("btn-open");
const btnClosed = document.getElementById("btn-closed");
const totalIssues = document.getElementById("total");
const spinner = document.getElementById("spinner");

const showLabels = (arr) => {
  const newElements = arr.map(
    (
      item,
    ) => `<div class="badge badge-soft badge-warning border border-warning rounded-2xl text-[12px]">${item.toUpperCase()}
                  </div>`,
  );
  return newElements.join(" ");
};

const removeActiveStatus = () => {
  const allButtons = document.querySelectorAll(".btn-tab");
  allButtons.forEach((btn) => {
    btn.classList.remove("btn-primary");
  });
};

const totalCounts = () => {
  totalIssues.innerText = issueContainer.children.length;
};

const showSpinner = () => {
  spinner.classList.remove("hidden");
  spinner.classList.add("flex");
};
const hideSpinner = () => {
  spinner.classList.add("hidden");
  spinner.classList.remove("flex");
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

// display issues
const displayIssues = (issues) => {
  issueContainer.innerHTML = "";
  issues.forEach((issue) => {
    const div = document.createElement("div");
    div.className = `space-y-3 p-4 rounded-lg shadow-md border-t-3 border-[${issue.status == "open" ? "#00A96E" : "#A855F7"}]`;
    div.innerHTML = `
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <img src="./assets/${issue.status == "open" ? "Open-Status.png" : "Closed- Status .png"}" alt="" />
                  <div class="badge badge-soft badge-error rounded-2xl">
                    ${issue.priority.toUpperCase()}
                  </div>
                </div>
                <h4 class="text-[14px] font-semibold">
                  ${issue.title}
                </h4>
                <p class="text-[12px] text-gray-500 line-clamp-2">
                  ${issue.description}
                </p>
                <div class="flex gap-1">
                ${showLabels(issue.labels)}
                </div>
              </div>
              <hr class="-mx-4 border-gray-200" />
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

const showCategory = (status) => {
  if (status == "all") {
    removeActiveStatus();
    btnAll.classList.add("btn-primary");
    loadAllIssues();
  } else if (status == "open") {
    removeActiveStatus();
    btnOpen.classList.add("btn-primary");
    loadOpenIssues();
  } else if (status == "closed") {
    removeActiveStatus();
    btnClosed.classList.add("btn-primary");
    loadClosedIssues();
  }
};

showCategory(currentStatus);
