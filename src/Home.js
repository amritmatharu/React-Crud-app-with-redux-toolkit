
const Home = (props) => {
  return (
    <main
      style={{
        padding: "1rem 0",
        width: "80%",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h2>Welcome to {props.user.name} Site!</h2>
    </main>
  );
};
export default Home;
