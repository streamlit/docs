import MediaQuery from 'react-responsive'

import Layout from '../components/layouts/globalTemplate'

import SideNav from '../components/navigation/sideNav'
import ArrowLinkContainer from '../components/navigation/arrowLinkContainer'
import ArrowLink from '../components/navigation/arrowLink'

import QuickLink from '../components/utilities/quickLink'
import SocialCallouts from '../components/utilities/socialCallout'
import Spacer from '../components/utilities/spacer'

import TileContainer from '../components/layouts/tileContainer'
import NewsContainer from '../components/layouts/newsContainer'
import InlineCalloutContainer from '../components/layouts/inlineCalloutContainer'

import Tile from '../components/blocks/tile'
import NewsEntry from '../components/blocks/newsEntry'
import Button from '../components/blocks/button'
import InlineCallout from '../components/blocks/inlineCallout'
import NoteSplit from '../components/blocks/noteSplit'

export default function Home(window) {

  return (
    <Layout window={window}>
      <section className="page container template-expanded-wide">
        <SideNav />
        <section className="content wide">
          <QuickLink>
            <h1>Welcome to Streamlit docs</h1>
          </QuickLink>
          <p><a>Streamlit</a> is an open-source Python library that makes it easy to create and share beautiful, custom web apps for machine learning and data science. In just a few minutes you can build and deploy powerful data apps - so let’s get started!</p>

          <Spacer size="2rem" />

          <TileContainer>
            <Tile icon="arrow_forward" title="Get Started" text="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia." background="violet-70" link="/tutorials/get-started" />
            <Tile icon="dvr" title="API reference" text="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia." background="orange-70" link="/reference-guides/api-reference" />
            <Tile icon="description" title="Topic guides" text="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia." background="l-blue-70" link="/topic-guides" />
          </TileContainer>
 
          <QuickLink>
            <h2 className='no-b-m'>What's new</h2>
          </QuickLink>

          <TileContainer>
            <Tile size="half" background="unset" color="unset" dark={{ background: "unset", color: 'white', border_color: 'gray-40' }} border_color="gray-40" img="/logo.svg" title="Feature title" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend a facilisis sagittis, vitae nibh massa in facilisis et. Pretium eget non cursus purus tempus porta sodales." link="/tutorials/get-started" />
            <Tile size="half" background="unset" color="unset" dark={{ background: "unset", color: 'white', border_color: 'gray-40' }} border_color="gray-40" icon="visibility" title="Feature title" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend a facilisis sagittis, vitae nibh massa in facilisis et. Pretium eget non cursus purus tempus porta sodales." link="/tutorials/get-started" />
            <Tile size="half" background="unset" color="unset" dark={{ background: "unset", color: 'white', border_color: 'gray-40' }} border_color="gray-40" icon="edit" title="Feature title" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend a facilisis sagittis, vitae nibh massa in facilisis et. Pretium eget non cursus purus tempus porta sodales." link="/tutorials/get-started" />
            <Tile size="half" background="unset" color="unset" dark={{ background: "unset", color: 'white', border_color: 'gray-40' }} border_color="gray-40" img="/logo.svg" title="Feature title" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend a facilisis sagittis, vitae nibh massa in facilisis et. Pretium eget non cursus purus tempus porta sodales." link="/tutorials/get-started" />
          </TileContainer>

          <NewsContainer>
            <NewsEntry date="2021-05-12T16:30:00.000Z" title="Title" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend a facilisis sagittis, vitae nibh massa in facilisis et. Pretium eget non cursus purus tempus porta sodales." link="/" />
            <NewsEntry date="2021-04-07T16:08:45.000Z" title="Title" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend a facilisis sagittis, vitae nibh massa in facilisis et. Pretium eget non cursus purus tempus porta sodales." link="/" />
            <NewsEntry date="2021-01-12T16:30:00.000Z" title="Title" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend a facilisis sagittis, vitae nibh massa in facilisis et. Pretium eget non cursus purus tempus porta sodales." link="/" />
            <Button link="/updates">Vieiw all updates</Button>
          </NewsContainer>

          <QuickLink>
            <h2>How to use our docs</h2>
          </QuickLink>
          <InlineCalloutContainer>
            { /* TODO: Remove Nuxt-link */ }
            <InlineCallout color="violet-70" icon="school" bold="Tutorials">include our <next-link to="/tutorials/get-started">Get Started</next-link> guide and a few step-by-step examples to building different types of apps in Streamlit.</InlineCallout>
            <InlineCallout color="l-blue-70" icon="description" bold="Topic guides">
              give you background on how different parts of Streamlit work. Make sure to check out the sections on <next-link to="/">Creating an app</next-link> and <next-link to="/">Deploying an app</next-link>, and for you advanced users who want to level up your apps, be sure to read up on <next-link to="/">Caching</next-link> and <next-link to="/components">Components</next-link>.
            </InlineCallout>
            <InlineCallout color="green-70" icon="code" bold="Cookbook">provides short code snippets that you can copy in for specific use cases.</InlineCallout>
            <InlineCallout color="orange-70" icon="menu_book" bold="Reference guides">are the bread and butter of how our APIs and configuration files work and will give you short, actionable explanations of specific functions and features.</InlineCallout>
            <InlineCallout color="red-70" icon="question_answer" bold="Support">are the bread and butter of how our APIs and configuration files work and will give you short, actionable explanations of specific functions and features.</InlineCallout>
          </InlineCalloutContainer>

          <NoteSplit
            background="gray-20"
            title="Join the community"
            copy="Streamlit is more than just a way to make data apps, it’s also a community of creators that share their apps and ideas and help each other make their work better. Please come join us on the community forum. We love to hear your questions, ideas, and help you work through your bugs — stop by today!"
            button={{ text: 'View fourm', link: '/' }}
            image="/join.png"
          />

          <SocialCallouts />

          <ArrowLinkContainer>
            <ArrowLink link="/tutorials/get-started" type="next" content="Get Started" />
          </ArrowLinkContainer>
        </section>
      </section>
    </Layout>
  )
}
