import getNewFeedItems from './feed';
import {
  addFeedItemToNotion,
  deleteOldUnreadFeedItemsFromNotion,
} from './notion';
import htmlToNotionBlocks from './parser';
import { translateText } from './translation';

async function index() {
  const feedItems = await getNewFeedItems();

  for (let i = 0; i < feedItems.length; i++) {
    const item = feedItems[i];
    const notionItem = {
      title: item.title,
      link: item.link,
      content: htmlToNotionBlocks(item.content),
      translatedTitle: translateText(item.title),
      translatedContent:translateText(item.content),
    };
    await addFeedItemToNotion(notionItem);
  }

  await deleteOldUnreadFeedItemsFromNotion();
}

index();
