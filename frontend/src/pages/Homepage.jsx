const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1>Hi {user ? user.username : "Guest"}</h1>
    </div>
  );
};

export default HomePage;
