import { selector, selectorFamily } from 'recoil';

// export const storageInfoValue = selector({
//   key: '@user/storageInfoValue',
//   get: ({ get }) => {
//     const user = get(userInfoState);

//     if (user?.storage) {
//       return {
//         used: user.storage.usage,
//         limit: user.storage.limit,
//         updatedAt: user.storage.updated_at,
//         exceedAt: user.storage.exceed_at,
//         calculation: !!user.storage.next_update_at,
//       };
//     }

//     return null;
//   },
// });
