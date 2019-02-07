import {extend} from 'flarum/extend';
import app from 'flarum/app';
import AdminNav from 'flarum/components/AdminNav';
import AdminLinkButton from 'flarum/components/AdminLinkButton';
import MasonFieldsPane from './panes/MasonFieldsPane';

export default function () {
    // create the route
    app.routes['huydeerpets-mason-fields'] = {
        path: '/huydeerpets/mason',
        component: MasonFieldsPane.component(),
    };

    // bind the route we created to the three dots settings button
    app.extensionSettings['huydeerpets-mason'] = () => m.route(app.route('huydeerpets-mason-fields'));

    extend(AdminNav.prototype, 'items', items => {
        // add the Image Upload tab to the admin navigation menu
        items.add('huydeerpets-mason-fields', AdminLinkButton.component({
            href: app.route('huydeerpets-mason-fields'),
            icon: 'fas fa-dungeon',
            children: 'Mason',
            description: app.translator.trans('huydeerpets-mason.admin.menu.description'),
        }));
    });
}
