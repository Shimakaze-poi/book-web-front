import React, {Component} from 'react';
import './styles/contentinformation.css'
import InformationLeft from "./InformationLeft";
import InformationRight from "./InformationRight";

class ContentInformation extends Component
{
    render()
    {
        return (
            <div id={'information'}>
                {/* InformationLeft 内容页左侧
                    InformationRight 内容页右侧 */}
                <InformationLeft/>
                <InformationRight/>
            </div>
        );
    }
}

export default ContentInformation;