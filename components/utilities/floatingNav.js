import React from "react";
import { breadcrumbsForSlug } from '../../lib/utils.cjs'

export default class FloatingNav extends React.Component {

    constructor(props) {
        super(props)
        this.handleTheme = this.handleTheme.bind(this)
        this.handleIntersection = this.handleIntersection.bind(this)
        this.generateMenu = this.generateMenu.bind(this)
        this.state = {
            target: false,
            observer: false,
            headers: [],
            menu: [],
            slug: props.slug.join('/'),
            theme: 'light-mode'
        }
    }

    handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target
                const hrefs = target.getElementsByTagName('a')
                if (hrefs.length > 0) {
                    const link = hrefs[0].getAttribute('href')
                    this.setState({ target: link })
                }
            }
        })
    }

    generateMenu() {
        if (this.state.headers.length > 0) { this.closeMenu() }
        const tocMenu = []
        const options = { threshold: 1.0 }
        const headers = document.querySelectorAll('article.leaf-page h1, article.leaf-page h2, article.leaf-page h3')
        const observe = new IntersectionObserver(this.handleIntersection, options)
        headers.forEach((ele) => {
            const hrefs = ele.getElementsByTagName('a')
            if (hrefs.length > 0) {
                const target = hrefs[0].getAttribute('href')
                tocMenu.push({
                    label: ele.innerText,
                    target: target,
                    level: ele.tagName
                })
                observe.observe(ele)
            }
        })
        this.setState({ observer: observe, menu: tocMenu, headers: headers })
    }

    closeMenu() {
        this.state.headers.forEach((ele) => { this.state.observer.unobserve(ele) })
    }

    componentDidMount() {
        this.generateMenu()
        window.addEventListener('ChangeTheme', this.handleTheme)
    }

    componentDidUpdate() {
        if (this.state.slug !== this.props.slug.join('/')) {
            this.setState({ slug: this.props.slug.join('/') })
            this.generateMenu()
        }
    }

    componentWillUnmount() {
        this.closeMenu()
        window.removeEventListener('ChangeTheme', this.handleTheme)
        this.setState({ observer: null, menu: [], headers: [] })
    }

    handleTheme() {
        this.setState({ theme: document.body.dataset.theme })
    }

    render() {
        let color
        let svgColor = (this.state.theme === 'light-mode') ? 'black' : 'white'
        const props = this.props
        const menu = this.state.menu
        const target = this.state.target
        const location = this.state.slug.split('/')[0];
    
        // Get the Root Object and find the appropriate color
        const breadCrumbs = breadcrumbsForSlug(props.menu, `/${this.state.slug}`)
        
        if (breadCrumbs.length) {
            const rootElement = breadCrumbs[0]
            const darkColor = rootElement.color
            color = darkColor
            if (this.state.theme === 'light-mode') {
                const colorParts = darkColor.split('-')
                let lightMode = colorParts.length > 1 ? Number(colorParts[1]) - 50 : 10
                if (lightMode < 10 || isNaN(lightMode)) lightMode = 10
                color = `${colorParts.slice(0, -1).join('-')}-${lightMode}`
                svgColor = darkColor
            }
        }
        
        let svg = (
            <svg xmlns="http://www.w3.org/2000/svg" className={svgColor} width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M0.952437 7.90752L1.14007 8.07272L0.952436 7.90752C0.682521 8.21409 0.682521 8.69954 0.952436 9.00611C1.23875 9.3313 1.71774 9.3313 2.00405 9.00611L5.04756 5.54929C5.31748 5.24273 5.31748 4.75727 5.04756 4.45071L2.00405 0.993892C1.71774 0.668703 1.23875 0.668703 0.952437 0.993892C0.682521 1.30046 0.682521 1.78591 0.952437 2.09248L3.51233 5L0.952437 7.90752Z" fill="none" stroke="none" strokeWidth="0.5"></path></svg>
        )
        
        return (
            <div className='toc'>
                <ol className='toc-level'>
                    {menu.map((item, index) => {
                        const active = item.target == target ? 'active' : ''
                        return (<li className={`level-${item.level} ${active} bg-${color}`} key={`toc-${index}`}>{svg}<a href={item.target}>{item.label}</a></li>)
                    })}
                </ol>
            </div>
        )
    }
}