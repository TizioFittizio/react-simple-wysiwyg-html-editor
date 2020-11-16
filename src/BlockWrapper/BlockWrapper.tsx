import * as React from 'react';
import './BlockWrapper.css';
import BlockWrapperIcons from './BlockWrapperIcons';

interface Props {
    icon: 'new' | 'edit';
    showMenuOnClick?: boolean;
    showMenuButtonDelete?: boolean;
    showMenuButtonToggleReadonly?: boolean;
    showMenuButtonShowHTML?: boolean;
    showMenuButtonAddParagraph?: boolean;
    showMenuButtonAddHTML?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
}

interface State {
    showOptionsIcon?: boolean;
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
        let iconClassName = 'options-icon';
        if (!this.state.showOptionsIcon) iconClassName += ' hide';
        return (
            <div className='block-wrapper-options'>
                <div className={iconClassName}>
                    <img
                        width='15px'
                        height='15px' 
                        src={this.props.icon === 'new' ? BlockWrapperIcons.ADD : BlockWrapperIcons.EDIT} 
                    />
                </div>
            </div>
        );
    }

    private renderChildren(){
        return (
            <div className='block-wrapper-children'>
                {this.props.children}
            </div>
        );
    }

}

export default BlockWrapper;