const API_URL =
  "https://randomuser.me/api/?results=12&nat=in,us,gb,ca,au&inc=name,email,location,picture,gender,nat";

const usersGrid = document.getElementById("usersGrid");
const searchInput = document.getElementById("searchInput");
const genderFilter = document.getElementById("genderFilter");
const refreshButton = document.getElementById("refreshButton");
const retryButton = document.getElementById("retryButton");
const profileCount = document.getElementById("profileCount");
const apiStatus = document.getElementById("apiStatus");
const statusMessage = document.getElementById("statusMessage");
const errorBox = document.getElementById("errorBox");
const errorMessage = document.getElementById("errorMessage");

let allUsers = [];

function showLoading() {
  usersGrid.innerHTML = "";
  for (let i = 0; i < 6; i += 1) {
    const skeleton = document.createElement("div");
    skeleton.className = "skeleton";
    skeleton.setAttribute("aria-hidden", "true");
    usersGrid.appendChild(skeleton);
  }
  statusMessage.textContent = "Fetching fresh profiles from the public API...";
  apiStatus.textContent = "Loading";
  profileCount.textContent = "—";
  errorBox.hidden = true;
}

function showError(message) {
  usersGrid.innerHTML = "";
  errorMessage.textContent = message;
  errorBox.hidden = false;
  statusMessage.textContent = "The request could not be completed.";
  apiStatus.textContent = "Unavailable";
  profileCount.textContent = "0";
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function createUserCard(user) {
  const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;
  const city = user.location?.city || "Location unavailable";
  const country = user.location?.country || "";
  const locationText = country ? `${city}, ${country}` : city;

  const card = createElement("article", "user-card");
  const top = createElement("div", "card-top");
  const avatar = createElement("img", "avatar");
  avatar.src = user.picture?.medium || "";
  avatar.alt = `Portrait of ${user.name.first} ${user.name.last}`;
  avatar.loading = "lazy";

  const personInfo = createElement("div", "person-info");
  const name = createElement("h2", "person-name", fullName);
  const email = createElement("span", "person-email", user.email || "Email unavailable");
  personInfo.append(name, email);
  top.append(avatar, personInfo);

  const divider = createElement("div", "card-divider");
  const meta = createElement("div", "card-meta");
  const location = createElement("div", "location");
  const locationLabel = createElement("span", "location-label", "LOCATION");
  const locationValue = createElement("span", "", locationText);
  location.append(locationLabel, locationValue);

  const tag = createElement("span", "tag", user.gender || "profile");
  meta.append(location, tag);
  card.append(top, divider, meta);

  return card;
}

function renderUsers() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedGender = genderFilter.value;

  const filteredUsers = allUsers.filter((user) => {
    const searchableText = [
      user.name?.first,
      user.name?.last,
      user.email,
      user.location?.city,
      user.location?.country
    ].join(" ").toLowerCase();

    const matchesSearch = searchableText.includes(searchTerm);
    const matchesGender =
      selectedGender === "all" || user.gender === selectedGender;

    return matchesSearch && matchesGender;
  });

  usersGrid.innerHTML = "";

  if (filteredUsers.length === 0) {
    usersGrid.appendChild(
      createElement("div", "empty-state", "No matching profiles found. Try another search or filter.")
    );
  } else {
    filteredUsers.forEach((user) => usersGrid.appendChild(createUserCard(user)));
  }

  profileCount.textContent = String(filteredUsers.length);
  statusMessage.textContent =
    `Showing ${filteredUsers.length} of ${allUsers.length} profiles.`;
}

async function fetchUsers() {
  refreshButton.disabled = true;
  refreshButton.innerHTML = "<span aria-hidden='true'>↻</span> Loading...";
  showLoading();

  try {
    const response = await fetch(API_URL, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}.`);
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.results)) {
      throw new Error("The API returned an unexpected response.");
    }

    allUsers = data.results;
    apiStatus.textContent = "Connected";
    renderUsers();
  } catch (error) {
    console.error("API request failed:", error);
    showError(
      error instanceof TypeError
        ? "Network error. Check your internet connection and try again."
        : error.message || "Something went wrong. Please try again."
    );
  } finally {
    refreshButton.disabled = false;
    refreshButton.innerHTML = "<span aria-hidden='true'>↻</span> Refresh data";
  }
}

searchInput.addEventListener("input", renderUsers);
genderFilter.addEventListener("change", renderUsers);
refreshButton.addEventListener("click", fetchUsers);
retryButton.addEventListener("click", fetchUsers);

fetchUsers();
