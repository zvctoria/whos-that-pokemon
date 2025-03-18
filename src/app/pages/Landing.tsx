import { SelectPanel } from "../../components/SelectPanel";
import { HintPanel } from "../../components/HintPanel";
import { SettingsButton } from "../../components/SettingsButton";
import { PokeBall } from "../../components/PokeBall";
import logo from "../../assets/logo.png";

const Landing = () => {
  return (
    <>
      <img
        className="h-auto w-1/2 mx-auto"
        src={logo}
        alt="Who's That Pokémon header"
      />
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
