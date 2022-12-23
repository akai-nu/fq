import { atomWithStorage } from 'jotai/utils';

export const userTokenAtom = atomWithStorage<string | null>('userToken', null);