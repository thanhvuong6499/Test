import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './the-loai-van-ban.reducer';
import { ITheLoaiVanBan } from 'app/shared/model/the-loai-van-ban.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface ITheLoaiVanBanUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ITheLoaiVanBanUpdateState {
  isNew: boolean;
}

export class TheLoaiVanBanUpdate extends React.Component<ITheLoaiVanBanUpdateProps, ITheLoaiVanBanUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { theLoaiVanBanEntity } = this.props;
      const entity = {
        ...theLoaiVanBanEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/the-loai-van-ban');
  };

  render() {
    const isInvalid = false;
    const { theLoaiVanBanEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhipsterApp.theLoaiVanBan.home.createOrEditLabel">
              <Translate contentKey="jhipsterApp.theLoaiVanBan.home.createOrEditLabel">Create or edit a TheLoaiVanBan</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : theLoaiVanBanEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="the-loai-van-ban-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="noiDungLabel" for="noiDung">
                    <Translate contentKey="jhipsterApp.theLoaiVanBan.noiDung">Noi Dung</Translate>
                  </Label>
                  <AvField id="the-loai-van-ban-noiDung" type="text" name="noiDung" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/the-loai-van-ban" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={isInvalid || updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  theLoaiVanBanEntity: storeState.theLoaiVanBan.entity,
  loading: storeState.theLoaiVanBan.loading,
  updating: storeState.theLoaiVanBan.updating
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TheLoaiVanBanUpdate);
