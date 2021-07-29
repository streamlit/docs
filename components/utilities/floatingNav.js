import React from "react";

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
            theme: 'light',
            slug: props.slug.join('/')
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
        if ( this.state.headers.length > 0 ) { this.closeMenu() }
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
    }

    componentDidUpdate() {
        if ( this.state.slug !== this.props.slug.join('/') ) {
            this.setState({ slug: this.props.slug.join('/') })
            this.generateMenu()
        }
    }

    componentWillUnmount() {
        this.closeMenu()
        this.setState({ observer: null, menu: [], headers: [] })
    }
    
    handleTheme() {
        this.setState({ theme: document.body.dataset.theme })
    }

    render() {
        const props = this.props
        const menu = this.state.menu
        const target = this.state.target
        
        return (
            <div className='toc'>
                <ol className='toc-level'>
                    {menu.map((item, index) => {
                        const active = item.target == target ? 'active' : ''
                        return ( <li className={`level-${item.level} ${active}`} key={`toc-${index}`}><a href={item.target}>{item.label}</a></li> )
                    })}
                </ol>
            </div>
        )
    }
}