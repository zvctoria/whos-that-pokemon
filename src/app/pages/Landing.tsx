import { SelectPanel } from "../../components/SelectPanel";
import { HintPanel } from "../../components/HintPanel";
import { SettingsButton } from "../../components/SettingsButton";
import { PokeBall } from "../../components/PokeBall";

const Landing = () => {
  return (
    <>
      <div>
        <h1 className="text-center">Who's that Pokémon?</h1>
      </div>
      <SelectPanel></SelectPanel>
      <h2>Please click at least one generation! (Toggle)</h2>
      <button className="bg-red-600">Replay Cry</button>
      <input type="text" className="block bg-white" />
      <HintPanel></HintPanel>
      <button>(when done) Try Again</button>
      <SettingsButton></SettingsButton>
      <PokeBall></PokeBall>
    </>
  );
};

export default Landing;
