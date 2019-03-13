import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './tai-lieu.reducer';
import { ITaiLieu } from 'app/shared/model/tai-lieu.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITaiLieuDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class TaiLieuDetail extends React.Component<ITaiLieuDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { taiLieuEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jhipsterApp.taiLieu.detail.title">TaiLieu</Translate> [<b>{taiLieuEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="tenVanBan">
                <Translate contentKey="jhipsterApp.taiLieu.tenVanBan">Ten Van Ban</Translate>
              </span>
            </dt>
            <dd>{taiLieuEntity.tenVanBan}</dd>
            <dt>
              <span id="tomTat">
                <Translate contentKey="jhipsterApp.taiLieu.tomTat">Tom Tat</Translate>
              </span>
            </dt>
            <dd>{taiLieuEntity.tomTat}</dd>
            <dt>
              <span id="uRL">
                <Translate contentKey="jhipsterApp.taiLieu.uRL">U RL</Translate>
              </span>
            </dt>
            <dd>{taiLieuEntity.uRL}</dd>
            <dt>
              <span id="dungLuong">
                <Translate contentKey="jhipsterApp.taiLieu.dungLuong">Dung Luong</Translate>
              </span>
            </dt>
            <dd>{taiLieuEntity.dungLuong}</dd>
            <dt>
              <span id="tag">
                <Translate contentKey="jhipsterApp.taiLieu.tag">Tag</Translate>
              </span>
            </dt>
            <dd>{taiLieuEntity.tag}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="jhipsterApp.taiLieu.status">Status</Translate>
              </span>
            </dt>
            <dd>{taiLieuEntity.status}</dd>
            <dt>
              <Translate contentKey="jhipsterApp.taiLieu.theloaitailieu">Theloaitailieu</Translate>
            </dt>
            <dd>
              {taiLieuEntity.theloaitailieus
                ? taiLieuEntity.theloaitailieus.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === taiLieuEntity.theloaitailieus.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/tai-lieu" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/tai-lieu/${taiLieuEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ taiLieu }: IRootState) => ({
  taiLieuEntity: taiLieu.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TaiLieuDetail);
