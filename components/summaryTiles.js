import TileContainer from '../components/layouts/tileContainer'
import Tile from '../components/blocks/tile'

export default function SummaryTiles() {
  return (
    <TileContainer>
      <Tile
        icon="arrow_forward"
        title="Get Started"
        text="If you're new to Streamlit and don't know where to start, this is a good place."
        background="violet-70"
        link="/library/get-started"
      />

      <Tile
        icon="dvr"
        title="API Reference"
        text="Learn about our APIs, with actionable explanations of specific functions and features."
        background="violet-70"
        link="/library/api-reference"
      />

      <Tile
        icon="grid_view"
        title="App Gallery"
        text="Try out awesome apps created by our users, and curated from our forums or Twitter."
        background="orange-70"
        link="https://streamlit.io/gallery"
      />
    </TileContainer>
  )
}
