import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './co-quan-ban-hanh.reducer';
import { ICoQuanBanHanh } from 'app/shared/model/co-quan-ban-hanh.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface ICoQuanBanHanhUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ICoQuanBanHanhUpdateState {
  isNew: boolean;
}

export class CoQuanBanHanhUpdate extends React.Component<ICoQuanBanHanhUpdateProps, ICoQuanBanHanhUpdateState> {
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
      const { coQuanBanHanhEntity } = this.props;
      const entity = {
        ...coQuanBanHanhEntity,
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
    this.props.history.push('/entity/co-quan-ban-hanh');
  };

  render() {
    const isInvalid = false;
    const { coQuanBanHanhEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhipsterApp.coQuanBanHanh.home.createOrEditLabel">
              <Translate contentKey="jhipsterApp.coQuanBanHanh.home.createOrEditLabel">Create or edit a CoQuanBanHanh</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : coQuanBanHanhEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="co-quan-ban-hanh-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="tenCoQuanLabel" for="tenCoQuan">
                    <Translate contentKey="jhipsterApp.coQuanBanHanh.tenCoQuan">Ten Co Quan</Translate>
                  </Label>
                  <AvField id="co-quan-ban-hanh-tenCoQuan" type="text" name="tenCoQuan" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/co-quan-ban-hanh" replace color="info">
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
  coQuanBanHanhEntity: storeState.coQuanBanHanh.entity,
  loading: storeState.coQuanBanHanh.loading,
  updating: storeState.coQuanBanHanh.updating
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CoQuanBanHanhUpdate);
