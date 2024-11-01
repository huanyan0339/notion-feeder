import getNewFeedItems from './feed';
import {
  addFeedItemToNotion,
  deleteOldUnreadFeedItemsFromNotion,
} from './notion';
import htmlToNotionBlocks from './parser';
import { translateText } from './translation';

async function index() {
  const feedItems = await getNewFeedItems();
  const translatedTitle = await translateText(item.title);
  const translatedContent = await translateText(item.content);

  for (let i = 0; i < feedItems.length; i++) {
    const item = feedItems[i];
    const translatedTitle = await translateText(item.title); // Translate title
    const translatedContent = await translateText(item.content); // Translate content
  
    const notionItem = {
      title: `${item.title} (Translated: ${translatedTitle})`, // Include original title and translation
      link: item.link,
      content: [
        ...htmlToNotionBlocks(item.content),
        {
          type: 'paragraph',
          text: {
            content: `Translated content: ${translatedContent}`, // Append translation
          },
        },
      ],
    };
    await addFeedItemToNotion(notionItem);
  }
  
  await deleteOldUnreadFeedItemsFromNotion();
}

index();
