import React from 'react';
import {Image, Item, Label } from 'semantic-ui-react'

const setText =(text) => {
    return text.length >= 300 ? text.substring(0, 299) + "..." : text;
};

const Post = (props) => {
        return (
            <Item>
                <Item.Image src={ props.image } />

                <Item.Content>
                    <Item.Header as='a'>{ props.title }</Item.Header>
                    <Item.Description>{setText(props.text)}</Item.Description>
                    <Item.Extra>
                        <Label>IMAX</Label>
                        <Label icon='calendar alternate outline' content={`Data public: ${props.time}`} />
                    </Item.Extra>
                </Item.Content>
            </Item>
        );

};

export default Post;