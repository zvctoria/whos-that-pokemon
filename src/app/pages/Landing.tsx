const Landing = () => {
  return (
    <>
      <div>
        <h1>Who's that Pokémon?</h1>
      </div>
      <div id="select-gens">
        <div>Gens 1-5</div>
        <div>Gens 6-9</div>
      </div>
      <div>
        <h2>Please click at least one generation! (Toggle)</h2>
      </div>
      <div>
        <button>Replay Cry</button>
      </div>
      <div id="answer-form">
        <input type="text" />
      </div>
      <div>Type () () </div>
      <div>This Pokémon weighs BOLD(number kg) </div>
      <div>
        <p>Not Helpful? MASTER BALL</p>
        <button>Hint: see what's inside</button>
      </div>
      <div>First appeared in: </div>
      <div>
        <h2>Can potentially have the following abilities:</h2>
        <div>
          <h3>Ability 1 (dynamic)</h3>
          <p>Description</p>
        </div>
      </div>
      <div>Sprite</div>
      <button>(when done) Try Again</button>
      <div>LEFT: settings. RIGHT: pokeball</div>
    </>
  );
};

export default Landing;
