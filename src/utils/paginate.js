import _ from 'lodash';

export function paginate(items, pageNum, pageSize) {
    const startIndex = (pageNum - 1) * pageSize;
    // convert js array into lodash wrapper
    //     _(items);
    //     _.slice(items, startIndex);
    //     _.take();

    //  returns regular array           from        _ wrapper
    return _(items).slice(startIndex).take(pageSize).value();
}