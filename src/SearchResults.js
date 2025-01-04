import { Row, Col, Card, Spinner } from "react-bootstrap";
import { artworkImageUrl } from "./api";

function SearchResults({ results, loading }) {
  if (loading) {
    return (
      <Row>
        <Spinner className="mx-auto" animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Row>
    );
  }

  if (!(results && results.length)) {
    return null;
  }

  //该列在大屏幕上将占据网格的 3 列，即每行4个，中等屏幕上将占据 4 列，即每行3个，超小屏幕上将占据 12 列，即每行1个
  return (
    <Row>
      {results.map((result) => (
        <Col xs={12} md={4} lg={3} key={result.id}>
          <Card>
            <Card.Img
              variant="top"
              src={artworkImageUrl(result.image_id, 250)}
              alt={result.thumbnail?.alt_text}
            />
            <Card.Body>
              <Card.Title>{result.title}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default SearchResults;
