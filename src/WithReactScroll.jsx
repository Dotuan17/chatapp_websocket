import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";
import { useState } from "react";

export const WithReactScroll = ({
  message,
  fetchData,
  totalMessage,
  setPage,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  console.log("message", message);

const handleLoadMoreData = async () => {
    if (isLoading) return;
    setIsLoading(true);

    await setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchData(nextPage);
      return nextPage;
    });

    setIsLoading(false);
  };

return (
  <div
    id="scrollableDiv"
    style={{
      height: 350,
      overflow: "auto",
      display: "flex",
      flexDirection: "column-reverse",
      minHeight: 350,
    }}
  >
    <InfiniteScroll
      dataLength={message.length}
      next={handleLoadMoreData}
      hasMore={totalMessage > message.length}
      loader={<p>Loading...</p>}
      endMessage={<p>No more data to load.</p>}
      inverse={true}
      scrollableTarget="scrollableDiv"
      style={{ display: "flex", flexDirection: "column-reverse" }}
    >
      <div>
        {[...message].reverse().map((msg) => (
          <div key={msg._id}>
            <div
              style={{
                display: "flex",
                justifyContent: msg.isSender ? "flex-end" : "flex-start",
              }}
            >
              <div className={msg.isSender ? "mess-right" : "mess-left"}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  </div>
);
};

WithReactScroll.propTypes = {
  message: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  totalMessage: PropTypes.number.isRequired,
};
