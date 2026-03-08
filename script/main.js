const issueContainer = document.getElementById("issue-container");

const loadIssues = async () => {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const issues = await res.json();
    displayIssues(issues.data);
}

const displayIssues = (issues) => {
    issues.forEach(issue => {
        const div = document.createElement('div');
        div.className = "space-y-3 p-4 rounded-lg shadow-md border-t-3 border-green-600";
        div.innerHTML = `
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <img src="./assets/Open-Status.png" alt="" />
                  <div class="badge badge-soft badge-error rounded-2xl">
                    HIGH
                  </div>
                </div>
                <h4 class="text-[14px] font-semibold">
                  Fix navigation menu on mobile devices
                </h4>
                <p class="text-[12px] text-gray-500">
                  The navigation menu doesn't collapse properly on mobile
                  devices...
                </p>
                <div class="flex gap-1">
                  <div class="badge badge-soft badge-error border border-error rounded-2xl text-[12px]">
                    <i class="fa-solid fa-bug"></i>BUG
                  </div>
                  <div class="badge badge-soft badge-warning border border-warning rounded-2xl text-[12px]">
                    <i class="fa-regular fa-life-ring"></i>HELP WANTED
                  </div>
                </div>
              </div>
              <hr class="border-gray-200" />
              <div>
                <p class="text-[12px] text-gray-500">#1 by john_doe</p>
                <p class="text-[12px] text-gray-500">1/15/2024</p>
              </div>
        `;
        issueContainer.append(div);
    });
}

loadIssues();