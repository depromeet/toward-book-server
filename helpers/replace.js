export default (bookItems) => {
  let filtered;
  if (bookItems.length > 1) {
    filtered = bookItems.map((item) => {
      const rObj = {
        title: item.title.replace(/(<([^>]+)>)/gi, ''),
        image: item.image,
        author: item.author.replace(/(<([^>]+)>)/gi, ''),
        publisher: item.publisher,
        pubDate: item.pubdate,
        description: item.description.replace(/(<([^>]+)>)/gi, '').replace(/\n/gi, ''),
      };
      return rObj;
    });
  } else {
    filtered = {
      title: bookItems.title.replace(/(<([^>]+)>)/gi, ''),
      image: bookItems.image,
      author: bookItems.author.replace(/(<([^>]+)>)/gi, ''),
      publisher: bookItems.publisher,
      pubDate: bookItems.pubdate,
      description: bookItems.description.replace(/(<([^>]+)>)/gi, '').replace(/\n/gi, ''),
    };
  }
  return filtered;
};
