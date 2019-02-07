import {extend} from 'flarum/extend';
import app from 'flarum/app';
import PermissionGrid from 'flarum/components/PermissionGrid';

export default function () {
    extend(PermissionGrid.prototype, 'viewItems', items => {
        items.add('huydeerpets-mason-update-own-fields', {
            icon: 'fas fa-dungeon',
            label: app.translator.trans('huydeerpets-mason.admin.permissions.update-own-fields'),
            permission: 'huydeerpets.mason.update-own-fields',
        });
    });

    extend(PermissionGrid.prototype, 'viewItems', items => {
        items.add('huydeerpets-mason-update-other-fields', {
            icon: 'fas fa-dungeon',
            label: app.translator.trans('huydeerpets-mason.admin.permissions.update-other-fields'),
            permission: 'huydeerpets.mason.update-other-fields',
            allowGuest: true,
        });
    });

    extend(PermissionGrid.prototype, 'viewItems', items => {
        items.add('huydeerpets-mason-skip-required-fields', {
            icon: 'fas fa-dungeon',
            label: app.translator.trans('huydeerpets-mason.admin.permissions.skip-required-fields'),
            permission: 'huydeerpets.mason.skip-required-fields',
        });
    });
}
