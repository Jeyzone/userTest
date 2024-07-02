let userData = [];

const fetchUser = async () => {
  // Il faut mettre async et await car si on met pas, il va log avant de regarder le fetch
  await fetch("https://randomuser.me/api/?results=24")
    .then((res) => res.json())
    .then((data) => (userData = data.results));
  console.log(userData); // ou a la place de async et await on met un setTimeOut
};

const userDisplay = async () => {
  await fetchUser();

  const dateParser = (date) => {
    // Reconvertir la date
    ù;
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return newDate;
  };

  const dayCalc = (date) => {
    // calculer le nombre de jour
    let today = new Date();
    let todayTimestamp = Date.parse(today);
    let timestamp = Date.parse(date);
    return Math.ceil((todayTimestamp - timestamp) / 8.64e7); // Math.ceil permet d'arrondir a rien apres la virgule
  };

  document.body.innerHTML = userData
    .map(
      (user) =>
        `
      <div class="card">
        <img src=${user.picture.large}>
        <h3>${user.name.first}</h3>
        <p>${user.dob.age} ans</p>  
        <p>${user.location.country}</p>
        <em> Membre depuis : ${dayCalc(user.registered.date)} jours</em>
      </div>
  `
    )
    .join("");
};
userDisplay();
