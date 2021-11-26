import TileContainer from "../components/layouts/tileContainer";
import Tile from "../components/blocks/tile";

const SummaryTiles = () => {
  return (
    <TileContainer>
      <Tile
        icon="arrow_forward"
        title="Get started"
        text="If you're new to Streamlit and don't know where to start, this is a good place."
        background="violet-70"
        link="/library/get-started"
      />

      <Tile
        icon="dvr"
        title="API reference"
        text="Learn about our APIs, with actionable explanations of specific functions and features."
        background="violet-70"
        link="/library/api-reference"
      />

      <Tile
        icon="grid_view"
        title="App gallery"
        text="Try out awesome apps created by our users, and curated from our forums or Twitter."
        background="orange-70"
        link="https://streamlit.io/gallery"
      />
    </TileContainer>
  );
};

export default SummaryTiles;
