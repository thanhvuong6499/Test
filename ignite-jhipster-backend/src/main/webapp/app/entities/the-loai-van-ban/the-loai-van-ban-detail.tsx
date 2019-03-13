import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './the-loai-van-ban.reducer';
import { ITheLoaiVanBan } from 'app/shared/model/the-loai-van-ban.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITheLoaiVanBanDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class TheLoaiVanBanDetail extends React.Component<ITheLoaiVanBanDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { theLoaiVanBanEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jhipsterApp.theLoaiVanBan.detail.title">TheLoaiVanBan</Translate> [<b>{theLoaiVanBanEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="noiDung">
                <Translate contentKey="jhipsterApp.theLoaiVanBan.noiDung">Noi Dung</Translate>
              </span>
            </dt>
            <dd>{theLoaiVanBanEntity.noiDung}</dd>
          </dl>
          <Button tag={Link} to="/entity/the-loai-van-ban" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/the-loai-van-ban/${theLoaiVanBanEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ theLoaiVanBan }: IRootState) => ({
  theLoaiVanBanEntity: theLoaiVanBan.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TheLoaiVanBanDetail);
