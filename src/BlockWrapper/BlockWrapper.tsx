import * as React from 'react';
import './BlockWrapper.css';
import BlockWrapperIcons from './BlockWrapperIcons';

interface Props {
    icon: 'new' | 'edit';
    showMenuOnClick?: boolean;
    showMenuButtonDelete?: boolean;
    showMenuButtonToggleReadonly?: boolean;
    showMenuButtonToggleShowHTML?: boolean;
    showMenuButtonAddParagraph?: boolean;
    showMenuButtonAddHTML?: boolean;
    onClick?: () => void;
    onMenuButtonDelete?: () => void;
    onMenuButtonToggleReadonly?: () => void;
    onMenuButtonToggleShowHTML?: () => void;
    onMenuButtonAddParagraph?: () => void;
    onMenuButtonAddHTML?: () => void;
    children: React.ReactNode;
}

interface State {
    showOptionsIcon?: boolean;
    showMenu?: boolean;
}

class BlockWrapper extends React.Component<Props, State> {

    public constructor(props: Props){
        super(props);
        this.state = { showOptionsIcon: false };
    }

    public render(){
        return (
            <div 
                className='block-wrapper-container'
                onMouseEnter={() => this.setState({ showOptionsIcon: true })}
                onMouseLeave={() => this.setState({ showOptionsIcon: false })}
            >
                {this.renderOptions()}
                {this.renderChildren()}
            </div>
        );
    }

    private renderOptions(){
        return (
            <div className='block-wrapper-options'>
                {this.renderIcon()}
                {this.renderMenu()}
            </div>
        );
    }

    private renderIcon(){
        let iconClassName = 'options-icon';
        if (!this.state.showOptionsIcon || this.state.showMenu) iconClassName += ' hide';
        return (
            <div 
                className={iconClassName}
                onClick={() => {
                    if (!this.props.showMenuOnClick) return;
                    this.setState({ showMenu: true });
                }}
            >
                <img
                    width='15px'
                    height='15px' 
                    src={this.props.icon === 'new' ? BlockWrapperIcons.ADD : BlockWrapperIcons.EDIT} 
                />
            </div>
        );
    }

    private renderMenu(){
        let menuClassName = 'block-wrapper-menu';
        if (this.state.showMenu) menuClassName += ' show';
        return (
            <div 
                className={menuClassName}
                onMouseLeave={() => {
                    if (this.state.showMenu) this.setState({ showMenu: false });
                }}
            >
                <ul>
                    {this.getMenuOptions().map(x => {
                        return (
                            <li
                                key={x.text} 
                                onClick={() => {
                                    x.onClick();
                                    this.setState({ showMenu: false });
                                }}
                            >
                                {x.text}
                            </li>
                        );
                    })}
                </ul>
            </div>
        )
    }

    private renderChildren(){
        return (
            <div className='block-wrapper-children'>
                {this.props.children}
            </div>
        );
    }

    private getMenuOptions(){
        const { props } = this;
        const menuItems = [];
        if (props.showMenuButtonDelete){
            menuItems.push({ text: 'Remove', onClick: () => this.props.onMenuButtonDelete() });
        }
        if (props.showMenuButtonToggleReadonly){
            menuItems.push({ text: 'Toggle Readonly', onClick: () => this.props.onMenuButtonToggleReadonly() });
        }
        if (props.showMenuButtonToggleShowHTML){
            menuItems.push({ text: 'Show HTML/Block', onClick: () => this.props.onMenuButtonToggleShowHTML() });
        }
        if (props.showMenuButtonAddParagraph){
            menuItems.push({ text: 'Add paragraph', onClick: () => this.props.onMenuButtonAddParagraph() });
        }
        if (props.showMenuButtonAddHTML){
            menuItems.push({ text: 'Add HTML', onClick: () => this.props.onMenuButtonAddHTML() });
        }
        return menuItems;
    }

}

export default BlockWrapper;