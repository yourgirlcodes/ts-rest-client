import {AllEntityApi, GeneralEntityApi, SingleEntityApi} from "./EntityApiTypes";
import {EntityDef} from "./Entity";
import {AtLeastOne, Promisify} from "./Utils";

export type EntityApi<
    EDef extends EntityDef = EntityDef,
    SubEntities extends Record<string, EntityApi<any, any, any>> = {},
    SelectedApis extends Partial<AllEntityApi<EDef>> = AllEntityApi<EDef>,
    > =
    Promisify<Pick<SelectedApis, Extract<keyof SelectedApis, keyof GeneralEntityApi<EDef>>>>      // pick only general entity operations
    & {
    for(...id: AtLeastOne<EDef['type']['id']>):                                                 // for a specific entity
        Promisify<Pick<SelectedApis, Extract<keyof SelectedApis, keyof SingleEntityApi<EDef>>>>   //      pick only single entity operations
        & SubEntities                                                                           //      add to it sub-entities
};

export type InferEntityId<T extends EntityApi<EntityDef, any, any>> =
    T extends EntityApi<EntityDef<infer TYPE>, any, any> ?
        TYPE['id']
        : never;
