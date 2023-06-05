import Link from "next/link";

import Layout from "../components/layouts/globalTemplate";
import Footer from "../components/navigation/footer";
import Component from "../components/layouts/component";
import TilesContainer from "../components/layouts/tileContainer";
import NewsContainer from "../components/layouts/newsContainer";
import InlineCalloutContainer from "../components/layouts/inlineCalloutContainer";

import HeaderLink from "../components/utilities/headerLink";
import Helpful from "../components/utilities/helpful";
import Psa from "../components/utilities/psa";
import SocialCallout from "../components/utilities/socialCallout";

import ArrowLinkContainer from "../components/navigation/arrowLinkContainer";
import ArrowLink from "../components/navigation/arrowLink";

import Note from "../components/blocks/note";
import Tip from "../components/blocks/tip";
import Important from "../components/blocks/important";
import NoteSplit from "../components/blocks/noteSplit";
import Code from "../components/blocks/code";
import YouTube from "../components/blocks/youTube";
import Image from "../components/blocks/image";
import Tile from "../components/blocks/tile";
import Table from "../components/blocks/table";
import NewsFeed from "../components/blocks/newsFeed";
import InlineCallout from "../components/blocks/inlineCallout";

export default function StyleGuide() {
  return (
    <Layout>
      <article className="page container">
        <Component label="H1">
          <h1>Get started</h1>
        </Component>
        <Component label="H2">
          <h2>Create your first Streamlit app</h2>
        </Component>
        <Component label="H3">
          <h3>Article H3</h3>
        </Component>
        <Component label="H4">
          <h4>Article H4</h4>
        </Component>
        <Component label="H5">
          <h5>Article H5</h5>
        </Component>
        <Component label="H6">
          <h6>Article H6</h6>
        </Component>
        <Component label=".large P">
          <p className="large">
            The easiest way to learn how to use Streamlit is to try things out
            yourself. As you read through this guide, test each method.{" "}
          </p>
        </Component>
        <Component label="P">
          <p>
            Streamlit is more than just a way to make data apps, it’s also a
            community of creators that share their apps and ideas and help each
            other make their work better.
          </p>
        </Component>
        <Component label=".small P">
          <p className="small">
            For this guide we’re using small amounts of data so that we can move
            quickly. You can check out our Tutorial on creating a data explorer
            to see an example of how to load data from an API and use @st.cache
            to cache it.
          </p>
        </Component>
        <Component label="Inside Link">
          <p>
            Check out our{" "}
            <Link href="/">
              <a>community forum</a>
            </Link>{" "}
            and post a question
          </p>
        </Component>
        <Component label="Ordered List - Plain">
          <ol>
            <li>
              Create a new Python file named{" "}
              <span className="inline_code">first_app.py</span>, then open it
              with your IDE or text editor.
            </li>
            <li>Next, import Streamlit.</li>
          </ol>
        </Component>
        <Component label="Ordered List - Tutorial">
          <ol className="tutorial">
            <li>
              The first step is to create a new Python script. Let’s call it{" "}
              <span className="inline_code">uber_pickups.py</span>.
            </li>
            <li>
              Open <span className="inline_code">uber_pickups.py</span> in your
              favorite IDE or text editor, then add these lines:
            </li>
          </ol>
        </Component>
        <Component label="Unordered List">
          <ul>
            <li>
              Check out our{" "}
              <Link href="/">
                <a>community forum</a>
              </Link>{" "}
              and post a question
            </li>
            <li>
              Quick help from command line with{" "}
              <span className="inline_code">streamlit --help</span>
            </li>
            <li>
              Read more documentation! Check out:
              <ul>
                <li>
                  <Link href="/">
                    <a>Streamlit Cookbook</a>
                  </Link>{" "}
                  for things like caching and inserting elements out of order
                </li>
                <li>
                  <Link href="/">
                    <a>API reference</a>
                  </Link>{" "}
                  for examples of every Streamlit command
                </li>
              </ul>
            </li>
          </ul>
        </Component>
        <Component label="Code snippet">
          <Code
            language="python"
            code={`import streamlit as st
                        # To make things easier later, we're also importing numpy and pandas for
                        # working with sample data.`}
          />
          <Code
            language="bash"
            code={`myscript.sh
ls -l myscript.sh`}
          />
        </Component>
        <Component label="Code header">
          <h3 className="code_header">streamlit.text</h3>
        </Component>
        <Component label="Quick Link">
          <HeaderLink>
            <h2>Article H2</h2>
          </HeaderLink>
        </Component>
        <Component label="Arrow Links">
          <ArrowLinkContainer>
            <ArrowLink link="/" type="back" content="Welcome to Streamlit" />
            <ArrowLink
              link="/library/get-started"
              type="next"
              content="Get Started"
            />
          </ArrowLinkContainer>
        </Component>
        <Component label="Note Block">
          <Note
            background="l-blue-10"
            color="gray-90"
            dark={{ background: "dark-black", color: "white" }}
          >
            <p>
              For this guide we’re using small amounts of data so that we can
              move quickly. You can check out our{" "}
              <Link href="/">
                <a>Tutorial</a>
              </Link>{" "}
              on creating a data explorer to see an example of how to load data
              from an API and use{" "}
              <Link href="/">
                <a>@st.cache</a>
              </Link>{" "}
              to cache it.
            </p>
          </Note>
        </Component>
        <Component label="Note Block (with code embed option)">
          <Tip
            background="violet-10"
            color="gray-90"
            dark={{ background: "dark-violet", color: "white" }}
          >
            <p>
              Did you know you can also pass a URL to streamlit run? This is
              great when combined with GitHub Gists. For example:
            </p>
            <Code
              language="bash"
              code={`streamlit run
https://raw.githubusercontent.com/streamlit/demo-uber-nyc-pickups/master/streamlit_app.py`}
            />
          </Tip>
        </Component>
        <Component label="Note Block (Important)">
          <Important
            background="orange-10"
            color="gray-90"
            dark={{ background: "dark-orange", color: "white" }}
          >
            <p>
              If the email you originally signed-up with isn’t the primary email
              associated with your GitHub account, just reply to your invite
              email telling us your primary GitHub email so we can grant access
              to the correct account.
            </p>
          </Important>
        </Component>
        <Component label="YouTube Embed">
          <YouTube
            videoId="BuD3gILJW-Q"
            caption="Caption can go here if necessary"
          />
        </Component>
        <Component label="Image">
          <Image
            src="/embed-image-01.jpg"
            alt="Streamlit's email highlighted on their GitHub profile"
            caption="Caption can go within the frame if necessary"
          />
          <Image
            src="/embed-image-02.png"
            alt="Streamlit's 'your apps' page highlighting the 'Edit secerets' link"
            caption="Caption can go within the frame if necessary"
          />
        </Component>
        <Component label="1, 2 or 3-Up Tiles">
          <TilesContainer>
            <Tile
              size="third"
              background="l-blue-70"
              color="white"
              icon="downloading"
              title="Install Streamlit"
              text="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia."
            />
            <Tile />
            <Tile />
            <Tile size="half" background="pink" />
            <Tile size="half" />
            <Tile size="two-third" />
            <Tile size="third" />
            <Tile size="full" />
          </TilesContainer>
        </Component>
        <Component label="Expanded ToC">
          <h4>Comming back to work on this.</h4>
        </Component>
        <Component label="Condensed ToC">
          <h4>Comming back to work on this.</h4>
        </Component>
        <Component label="Scroll Tracker Page Navigation">
          <h4>Comming back to work on this.</h4>
        </Component>
        <Component label="Styled Table">
          <Table
            head={{
              title: "Function signature",
              content: `<p class='code'>streamlit.text(body)</p>`,
            }}
            body={{ title: "Parameters" }}
            bodyRows={[
              {
                title: `<p><span class='bold'>body</span> <span class='italic code'>(str)</span></p>`,
                body: `<p>The string to display</p>`,
              },
              {
                title: `<p><span class='bold'>body</span> <span class='italic code'>(str)</span></p>`,
                body: `<p>The string to display</p>`,
              },
            ]}
          />
          <Table
            head={{
              title: "Function signature",
              content: `<p class='code'>streamlit.markdown(body, unsafe_allow_html=False)</p>`,
            }}
            body={{
              title: "Parameters",
            }}
            bodyRows={[
              {
                title: `<p><span class='bold'>body</span> <span class='italic code'>(str)</span></p>`,
                body: `<p>The string to display</p>`,
              },
              {
                title: `<p><span class='bold'>body</span> <span class='italic code'>(str)</span></p>`,
                body: `<p>The string to display as GitHub-flavored Markdown. Syntax information can be found at: <a href='https://github.github.com/gfm'>https://github.github.com/gfm</a>.</p><p>This also supports:</p><ul><li>Emoji shortcodes, such as :+1: and :sunglasses:. For a list of all supported codes, see <a href='https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json'>https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json</a>.<ul><li>Second level of bullets example</li><ul><li>Third level of bullets example</li></ul></ul></li><li>LaTeX expressions, by wrapping them in “$" or “$$" (the “$$" must be on their own lines). Supported LaTeX functions are listed at <a href='https://katex.org/docs/supported.html'>https://katex.org/docs/supported.html</a>.</li></ul>`,
              },
            ]}
          />
        </Component>
        <Component label="Code Highlights">
          <Code
            language="python"
            lines="11-17"
            code={`import streamlit as st
import pandas as pd
import numpy as np

st.title('Uber pickups in NYC')

DATE_COLUMN = 'date/time'
DATA_URL = ('https://s3-us-west-2.amazonaws.com/'
            'streamlit-demo-data/uber-raw-data-sep14.csv.gz')

@st.cacache_datache
def load_data(nrows):
    data = pd.read_csv(DATA_URL, nrows=nrows)
    lowercase = lambda x: str(x).lower()
    data.rename(lowercase, axis='columns', inplace=True)
    data[DATE_COLUMN] = pd.to_datetime(data[DATE_COLUMN])
    return data

data_load_state = st.text('Loading data...')
data = load_data(10000)
data_load_state.text("Done! (using st.cache_data)")`}
          />
        </Component>
        <Component label="Show Component Alongside Code">
          <Code
            img="/data-table.png"
            language="python"
            code={`chart_data = pd.DataFrame(
    p.random.randn(20, 3),
    columns=['a', 'b', 'c']
)

st.altair_chart(chart_data)`}
          />
        </Component>
        <Component label="Was This Page Helpful Widget">
          <Helpful />
        </Component>
        <Component label="Featured update">
          <TilesContainer>
            <Tile
              size={"half"}
              background={"unset"}
              color={"unset"}
              dark={{
                background: "unset",
                color: "white",
                border_color: "gray-90",
              }}
              border_color={"gray-40"}
              img={"/logo.svg"}
              link={"/library/get-started"}
            />
            <Tile
              size={"half"}
              background={"unset"}
              color={"unset"}
              dark={{
                background: "unset",
                color: "white",
                border_color: "gray-90",
              }}
              border_color={"gray-40"}
              img={"/logo.svg"}
              link={"/library/get-started"}
            />
            <Tile
              size={"half"}
              background={"unset"}
              color={"unset"}
              dark={{
                background: "unset",
                color: "white",
                border_color: "gray-90",
              }}
              border_color={"gray-40"}
              img={"/logo.svg"}
              link={"/library/get-started"}
            />
            <Tile
              size={"half"}
              background={"unset"}
              color={"unset"}
              dark={{
                background: "unset",
                color: "white",
                border_color: "gray-90",
              }}
              border_color={"gray-40"}
              img={"/logo.svg"}
              link={"/library/get-started"}
            />
          </TilesContainer>
        </Component>
        <Component label="News entry">
          <NewsContainer>
            <NewsFeed />
          </NewsContainer>
        </Component>
        <Component label="Forum PSA">
          <Psa />
        </Component>
        <Component label="Note split">
          <NoteSplit
            background="gray-20"
            title="Join the community"
            copy="Streamlit is more than just a way to make data apps, it’s also a community of creators that share their apps and ideas and help each other make their work better. Please come join us on the community forum. We love to hear your questions, ideas, and help you work through your bugs — stop by today!"
            button={{ text: "View fourm", link: "/" }}
            image="/join.png"
          />
        </Component>
        <Component label="Inline callout">
          <InlineCalloutContainer>
            <InlineCallout
              color="violet-70"
              icon="school"
              bold="Tutorials"
              href="/"
            >
              include our{" "}
              <Link href="/library/get-started">
                <a>Get Started</a>
              </Link>{" "}
              guide and a few step-by-step examples to building different types
              of apps in Streamlit.
            </InlineCallout>
            <InlineCallout
              color="violet-70"
              icon="school"
              bold="Tutorials"
              href="/"
            >
              include our{" "}
              <Link href="/library/get-started">
                <a>Get Started</a>
              </Link>{" "}
              guide and a few step-by-step examples to building different types
              of apps in Streamlit.
            </InlineCallout>
          </InlineCalloutContainer>
        </Component>
        <Component label="Social callouts">
          <SocialCallout />
        </Component>
      </article>
      <Footer />
    </Layout>
  );
}
