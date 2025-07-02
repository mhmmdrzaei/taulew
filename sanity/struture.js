import { CogIcon, LemonIcon, HomeIcon, CaseIcon, ChartUpwardIcon} from '@sanity/icons';
import { structureTool } from 'sanity/structure';

export const myStructure = (S) => {
  return S.list()
    .title('Tau Lewis')
    .items([
      ...S.documentTypeListItems()
        .reverse()
        .filter((listItem) => {
          const id = listItem.getId();
          if (!id) return true;
          return !['page', 'settings', 'page', 'project', "category"].includes(id);
        }),

      // Pages
      S.listItem()
        .title('Pages')
        .icon(LemonIcon)
        .child(S.documentTypeList('page')),

      // projects
      S.listItem()
        .title('Projects')
        .icon(CogIcon)
        .child(S.documentTypeList('project')),

      // cat
      S.listItem()
        .title('Project Categories')
        .icon(CaseIcon)
        .child(S.documentTypeList('category')),


      // Site Settings
      S.listItem()
        .title('Site Settings')
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
        ),
    ]);
};
