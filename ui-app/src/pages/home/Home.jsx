import Button from "@mui/material/Button";

function Home() {
   const getName = () => {
    return "Hedy Lamarr";
  };
  return (
    <div>
      <h1>Welcome to the Admin App</h1>
      <p>This is the home page.</p>

      <Button variant="contained">Hello world</Button>
        <h1>Hedy Lamarr's Todos</h1>
        <img
          src="https://i.imgur.com/yXOvdOSs.jpg"
          alt="Hedy Lamarr"
          className="photo"
        />
        <ul>
          <li>Invent new traffic lights</li>
          <li>Rehearse a movie scene</li>
          <li>Improve the spectrum technology</li>
          <li>{getName()}</li>
        </ul>
    </div>
  );
}

export default Home;
  