import TileContainer from "../components/layouts/tileContainer";
import Tile from "../components/blocks/tile";

const SummaryTiles = () => {
  return (
    <TileContainer>
      <Tile
        icon="install_desktop"
        title="Setup and installation"
        text="Get set up to start working with Streamlit."
        background="orange-70"
        link="/get-started/installation"
      />

      <Tile
        icon="dvr"
        title="API reference"
        text="Learn about our APIs, with actionable explanations of specific functions and features."
        background="indigo-70"
        link="/develop/api-reference"
      />

      <Tile
        icon="grid_view"
        title="App gallery"
        text="Try out awesome apps created by our users, and curated from our forums or Twitter."
        background="lightBlue-70"
        link="https://streamlit.io/gallery"
      />
    </TileContainer>
  );
};

export default SummaryTiles;
