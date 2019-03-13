import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './cau-tra-loi.reducer';
import { ICauTraLoi } from 'app/shared/model/cau-tra-loi.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICauTraLoiDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class CauTraLoiDetail extends React.Component<ICauTraLoiDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { cauTraLoiEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jhipsterApp.cauTraLoi.detail.title">CauTraLoi</Translate> [<b>{cauTraLoiEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="thangDiem">
                <Translate contentKey="jhipsterApp.cauTraLoi.thangDiem">Thang Diem</Translate>
              </span>
            </dt>
            <dd>{cauTraLoiEntity.thangDiem}</dd>
            <dt>
              <Translate contentKey="jhipsterApp.cauTraLoi.bandanhgia">Bandanhgia</Translate>
            </dt>
            <dd>{cauTraLoiEntity.bandanhgia ? cauTraLoiEntity.bandanhgia.id : ''}</dd>
            <dt>
              <Translate contentKey="jhipsterApp.cauTraLoi.tieuchidanhgia">Tieuchidanhgia</Translate>
            </dt>
            <dd>{cauTraLoiEntity.tieuchidanhgia ? cauTraLoiEntity.tieuchidanhgia.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/cau-tra-loi" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/cau-tra-loi/${cauTraLoiEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ cauTraLoi }: IRootState) => ({
  cauTraLoiEntity: cauTraLoi.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CauTraLoiDetail);
